using EBS.Core;
using EBS.Core.Domain;
using EBS.Core.Dto;
using Newtonsoft.Json;

namespace EBS.Services
{
    public class BookService : IBookService
    {
        private readonly List<Book> _books;

        public BookService(string jsonFileToLoad)
        {
            var jsonContent = File.ReadAllText(jsonFileToLoad);
            _books = JsonConvert.DeserializeObject<List<Book>>(jsonContent)!;
        }

        public async Task<PaginatedResult<BookDto>> GetBooks(int page, int itemsPerPage)
        {
            await Task.CompletedTask;
            if (itemsPerPage <= 0) throw new ArgumentException("Parameter 'itemsPerPage' must be greater than zero");

            var result = new PaginatedResult<BookDto>();

            result.Items = _books
                .OrderByDescending(x => x.AverageRating)
                .Skip((page - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .Select(x => new BookDto(x)).ToList();
            result.TotalItems = _books.Count;
            result.CurrentPage = page;
            result.ItemsPerPage = itemsPerPage;
            result.TotalPages = (int)((decimal)result.TotalItems / itemsPerPage);

            return result;
        }

        public async Task<BookDto?> GetBook(string isbn13)
        {
            await Task.CompletedTask;
            return _books.Where(x => x.Isbn13 == isbn13).Select(x => new BookDto(x)).SingleOrDefault();
        }
    }
}