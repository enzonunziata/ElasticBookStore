namespace EBS.Core.Dto
{
    public record BookSuggestionDto
    {
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string[] Authors { get; set; } = default!;
    }
}
