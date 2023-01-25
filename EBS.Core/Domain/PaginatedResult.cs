namespace EBS.Core.Domain
{
    public record PaginatedResult<T>
    {
        public IReadOnlyCollection<T> Items { get; set; } = new List<T>();
        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }

        public bool IsFirst()
        {
            return CurrentPage == 1;
        }

        public bool IsLast()
        {
            return CurrentPage == TotalPages;
        }
    }
}
