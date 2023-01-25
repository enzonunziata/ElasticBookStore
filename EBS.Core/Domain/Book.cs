using System.Text;

namespace EBS.Core.Domain
{
    public record Book
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

        public string SuggestionsField
        {
            get
            {
                StringBuilder sb = new StringBuilder();

                sb.AppendFormat("{0} {1} ", Title, Subtitle);

                foreach (var author in Authors)
                {
                    sb.Append(author);
                    sb.Append(' ');
                }
                foreach (var category in Categories)
                {
                    sb.Append(category);
                    sb.Append(' ');
                }

                return sb.ToString();
            }
        }
    }
}
