using EBS.Core;
using EBS.Core.Settings;
using EBS.Services;
using Elastic.Clients.Elasticsearch;
using Elastic.Transport;

namespace EBS.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var location = Path.GetDirectoryName(typeof(Program).Assembly.Location)!;
            var settingsJsonFile = Path.Combine(location, "appsettings.json");
            var booksJsonFile = Path.Combine(location, "books.json");

            var builder = WebApplication.CreateBuilder(args);
            builder.Configuration.AddJsonFile(settingsJsonFile);


            // Add services to the container.
            BookStoreSettings bookStoreSettings = new BookStoreSettings();
            builder.Configuration.GetSection("BookStore").Bind(bookStoreSettings);


            // **** ELASTIC **************************************************************************************************
            var elasticUri = string.Format("{0}:{1}", bookStoreSettings.Elastic.Host, bookStoreSettings.Elastic.Port);
            var elasticSettings = new ElasticsearchClientSettings(new Uri(elasticUri))
                .CertificateFingerprint(bookStoreSettings.Elastic.Fingerprint)
                .Authentication(new BasicAuthentication(bookStoreSettings.Elastic.Username, bookStoreSettings.Elastic.Password))
                .DefaultIndex(bookStoreSettings.Elastic.AliasName);

            var elasticClient = new ElasticsearchClient(elasticSettings);
            builder.Services.AddSingleton(elasticClient);

            builder.Services.AddSingleton<ISearchService, SearchService>();
            builder.Services.AddSingleton<IBookService>(new BookService(booksJsonFile));

            builder.Services.AddControllers();

            var app = builder.Build();


            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}