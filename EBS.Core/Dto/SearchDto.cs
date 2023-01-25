using EBS.Core.Domain;

namespace EBS.Core.Dto
{
    public class SearchDto
    {
        public string? Query { get; set; }
        public string? Author { get; set; }
        public string? Category { get; set; }
        public PaginatedResult<BookSearchDto> Books { get; set; } = default!;
        public List<BucketDto> Authors { get; set; } = default!;
        public List<BucketDto> Categories { get; set; } = default!;
    }
}
