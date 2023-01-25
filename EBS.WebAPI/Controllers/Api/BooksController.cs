using EBS.Core;
using EBS.Core.Dto;
using Microsoft.AspNetCore.Mvc;

namespace EBS.WebAPI.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ISearchService _searchService;
        private readonly IBookService _bookService;

        private const int SUGGESTIONS_COUNT = 8;
        private const int SEARCH_COUNT = 18;

        public BooksController(ISearchService searchService, IBookService bookService)
        {
            _searchService = searchService;
            _bookService = bookService;
        }

        [HttpGet]
        [Route("suggest/{term}")]
        public async Task<IActionResult> Suggest([FromRoute] string term)
        {
            IReadOnlyCollection<BookSuggestionDto> results;
            if (term.Length >= 3)
            {
                results = await _searchService.GetSuggestions(term, SUGGESTIONS_COUNT);
            }
            else
            {
                results = new List<BookSuggestionDto>();
            }
            return Ok(results);
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> Search([FromQuery] int p, [FromQuery] string? q, [FromQuery] string? a, [FromQuery] string? c)
        {
            var results = await _searchService.SearchBooks(q, a, c, p, SEARCH_COUNT);
            return Ok(results);
        }

        [HttpGet]
        [Route("{isbn13}")]
        public async Task<IActionResult> Book([FromRoute] string isbn13)
        {
            var results = await _bookService.GetBook(isbn13);
            return Ok(results);
        }
    }
}
