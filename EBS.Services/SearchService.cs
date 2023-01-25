using EBS.Core;
using EBS.Core.Domain;
using EBS.Core.Dto;
using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.Aggregations;
using Elastic.Clients.Elasticsearch.QueryDsl;
using System.Collections.ObjectModel;

namespace EBS.Services
{
    public class SearchService : ISearchService
    {
        private readonly ElasticsearchClient _client;
        
        public SearchService(ElasticsearchClient client)
        {
            _client = client;
        }

        public async Task<IReadOnlyCollection<BookSuggestionDto>> GetSuggestions(string term, int count)
        {
            var response = await _client.SearchAsync<BookSuggestionDto>(s => s
                .SourceIncludes("title, subtitle, authors")
                .Size(count)
                .Query(q => q
                    .MultiMatch(mm => mm
                        .Query(term)
                        .Type(TextQueryType.BoolPrefix)
                        .Fields("suggestionsField, suggestionsField._2gram, suggestionsField._3gram")
                    )
                )
            );

            if (response.IsValidResponse)
            {
                return response.Documents;
            }

            return new List<BookSuggestionDto>();
        }

        public async Task<SearchDto> SearchBooks(string? term, string? author, string? category, int page, int itemsPerPage)
        {
            SearchRequest<BookSearchDto> search = new SearchRequest<BookSearchDto>();
            ICollection<Query> must = new Collection<Query>();

            search.SourceExcludes = "description";
            search.From = (page - 1) * itemsPerPage;
            search.Size = itemsPerPage;
            search.Aggregations = new AggregationDictionary {
                new TermsAggregation("authors") { Field = "authors.keyword", Size = 10 },
                new TermsAggregation("categories") { Field = "categories.keyword", Size = 10 },
            };

            if (!string.IsNullOrWhiteSpace(term))
            {
                must.Add(new MultiMatchQuery() { Query = term, Fields = "title^5, subtitle^3, description, authors.text^2, categories.text", Fuzziness = new Fuzziness(1), Operator = Operator.Or });
            }

            if (!string.IsNullOrWhiteSpace(author))
            {
                must.Add(new TermQuery("authors.keyword") { Value = FieldValue.String(author) });
            }

            if (!string.IsNullOrWhiteSpace(category))
            {
                must.Add(new TermQuery("categories.keyword") { Value = FieldValue.String(category) });
            }

            if (!string.IsNullOrWhiteSpace(term) || !string.IsNullOrWhiteSpace(author) || !string.IsNullOrWhiteSpace(category))
            {
                search.Query = new BoolQuery { Must = must };
            }
            
            var response = await _client.SearchAsync<BookSearchDto>(search);

            var paginated = new PaginatedResult<BookSearchDto>();

            if (response.IsValidResponse)
            {
                paginated.Items = response.Documents;
                paginated.TotalItems = (int)response.Total;
                paginated.CurrentPage = page;
                paginated.ItemsPerPage = itemsPerPage;
                paginated.TotalPages = (int)Math.Ceiling((decimal)paginated.TotalItems / itemsPerPage);
            }

            StringTermsAggregate aggAuthors = (StringTermsAggregate)response.Aggregations!["authors"];
            StringTermsAggregate aggCategories = (StringTermsAggregate)response.Aggregations!["categories"];

            SearchDto result = new()
            {
                Query = term,
                Author = author,
                Category = category,
                Books = paginated,
                Authors = aggAuthors.Buckets.Select(x => new BucketDto { Key = x.Key.Value!.ToString()!, DocCount = x.DocCount }).ToList(),
                Categories = aggCategories.Buckets.Select(x => new BucketDto { Key = x.Key.Value!.ToString()!, DocCount = x.DocCount }).ToList()
            };

            return result;
        }
    }
}
