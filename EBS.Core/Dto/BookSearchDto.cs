namespace EBS.Core.Dto
{
    public class BookSearchDto
    {
        public string Isbn13 { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public List<string> Authors { get; set; } = new List<string>();
        public string Thumbnail { get; set; } = string.Empty;
        public float? AverageRating { get; set; }
        public int? RatingsCount { get; set; }
    }
}
