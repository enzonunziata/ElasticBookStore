namespace EBS.Core.Settings
{
    public class ElasticSettings
    {
        public string Host { get; set; } = string.Empty;
        public int Port { get; set; }
        public string Fingerprint { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string IndexName { get; set; } = string.Empty;
        public string AliasName { get; set; } = string.Empty;
    }
}
