using EBS.Core.Domain;
using EBS.Core.Dto;

namespace EBS.Core
{
    public interface IBookService
    {
        Task<PaginatedResult<BookDto>> GetBooks(int page, int itemsPerPage);
        Task<BookDto?> GetBook(string isbn13);
    }
}
