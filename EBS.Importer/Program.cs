using EBS.Core.Domain;
using EBS.Core.Settings;
using EBS.Services;
using Elastic.Clients.Elasticsearch;
using Elastic.Transport;
using Microsoft.Extensions.Configuration;

namespace EBS.Importer
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            var location = Path.GetDirectoryName(typeof(Program).Assembly.Location)!;
            var settingsJsonFile = Path.Combine(location, "appsettings.json");
            var booksJsonFile = Path.Combine(location, "books.json");

            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile(settingsJsonFile)
                .Build();


            BookStoreSettings bookStoreSettings = new BookStoreSettings();
            config.GetSection("BookStore").Bind(bookStoreSettings);

            // **** ELASTIC **************************************************************************************************
            var elasticUri = string.Format("{0}:{1}", bookStoreSettings.Elastic.Host, bookStoreSettings.Elastic.Port);
            var elasticSettings = new ElasticsearchClientSettings(new Uri(elasticUri))
                .CertificateFingerprint(bookStoreSettings.Elastic.Fingerprint)
                .Authentication(new BasicAuthentication(bookStoreSettings.Elastic.Username, bookStoreSettings.Elastic.Password))
                .DefaultIndex(bookStoreSettings.Elastic.AliasName);

            var elasticClient = new ElasticsearchClient(elasticSettings);

            BookService bookService = new BookService(booksJsonFile);
            SearchService searchService = new SearchService(elasticClient);

            var indexExists = elasticClient.Indices.Exists(bookStoreSettings.Elastic.IndexName);
            if (indexExists.Exists)
            {
                Console.Write("Removing existing index...");
                var indexDeleteResponse = elasticClient.Indices.Delete(bookStoreSettings.Elastic.IndexName);
                if (indexDeleteResponse.IsSuccess())
                {
                    Console.WriteLine("OK");
                }
                else
                {
                    Console.WriteLine("Unable to delete index");
                    Console.ReadLine();
                    return;
                }

                Console.Write("Removing existing alias...");
                var aliasDeleteResponse = elasticClient.Indices.DeleteAlias(bookStoreSettings.Elastic.IndexName, bookStoreSettings.Elastic.AliasName);
                if (aliasDeleteResponse.IsSuccess())
                {
                    Console.WriteLine("OK");
                }
                else
                {
                    Console.WriteLine("Unable to delete alias");
                    Console.ReadLine();
                    return;
                }
            }

            Console.Write("Creating index...");
            var indexCreateResponse = elasticClient.Indices.Create<Book>(bookStoreSettings.Elastic.IndexName, config =>
            {
                config.Mappings(m =>
                {
                    m.Properties(p =>
                    {
                        p.Text(x => x.Title);
                        p.Keyword(x => x.Isbn13);
                        p.Keyword(x => x.Isbn10);
                        p.Text(x => x.Authors, t => t.Fields(ff => ff.Keyword("keyword").Text("text")));
                        p.Text(x => x.Categories, t => t.Fields(ff => ff.Keyword("keyword").Text("text")));
                        p.Keyword(x => x.Thumbnail);
                        p.FloatNumber(x => x.AverageRating, w => w.NullValue(0));
                        p.Text(x => x.Subtitle);
                        p.Text(x => x.Description);
                        p.SearchAsYouType(x => x.SuggestionsField);
                        p.IntegerNumber(x => x.NumPages, w => w.NullValue(0));
                        p.IntegerNumber(x => x.RatingsCount, w => w.NullValue(0));
                        p.IntegerNumber(x => x.PublishedYear);
                    });
                });
            });

            if (indexCreateResponse.IsSuccess())
            {
                Console.WriteLine("OK");
            }
            else
            {
                Console.WriteLine("Unable to create the index");
                Console.ReadLine();
                return;
            }

            Console.Write("Creating alias...");
            var aliasCreateResponse = elasticClient.Indices.PutAlias(bookStoreSettings.Elastic.IndexName, bookStoreSettings.Elastic.AliasName);
            if (aliasCreateResponse.IsSuccess())
            {
                Console.WriteLine("OK");
            }
            else
            {
                Console.WriteLine("Unable to create the alias");
                Console.ReadLine();
                return;
            }

            var books = await bookService.GetBooks(1, 100);
            int totalPages = books.TotalPages;

            Console.Write("Indexing documents...");
            for (int page = 1; page < totalPages; page++)
            {
                books = await bookService.GetBooks(page, 100);
                var bulkResponse = await elasticClient.IndexManyAsync(books.Items.Where(x => !string.IsNullOrWhiteSpace(x.Thumbnail)));
                if (!bulkResponse.IsSuccess())
                {
                    Console.WriteLine($"Unable to bulk import page {page}");
                    Console.ReadLine();
                    return;
                }
            }
            Console.WriteLine("OK");
        }
    }
}