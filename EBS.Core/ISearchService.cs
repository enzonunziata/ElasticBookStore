using EBS.Core.Domain;
using EBS.Core.Dto;

namespace EBS.Core
{
    public interface ISearchService
    {
        Task<IReadOnlyCollection<BookSuggestionDto>> GetSuggestions(string term, int count);
        Task<SearchDto> SearchBooks(string? term, string? author, string? category, int page, int itemsPerPage);
    }
}
