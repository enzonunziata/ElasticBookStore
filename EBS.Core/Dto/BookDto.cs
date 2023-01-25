using EBS.Core.Domain;

namespace EBS.Core.Dto
{
    public class BookDto
    {
        public string Isbn13 { get; set; } = string.Empty;
        public string Isbn10 { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public List<string> Authors { get; set; } = new List<string>();
        public List<string> Categories { get; set; } = new List<string>();
        public string Thumbnail { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? PublishedYear { get; set; }
        public float? AverageRating { get; set; }
        public int? NumPages { get; set; }
        public int? RatingsCount { get; set; }

        public BookDto(Book book)
        {
            Isbn13 = book.Isbn13;
            Isbn10 = book.Isbn10;
            Title = book.Title;
            Subtitle = book.Subtitle;
            Authors = book.Authors;
            Categories = book.Categories;
            Thumbnail = book.Thumbnail;
            Description = book.Description;
            PublishedYear = book.PublishedYear;
            RatingsCount = book.RatingsCount;
            AverageRating = book.AverageRating;
            NumPages = book.NumPages;
        }
    }
}
