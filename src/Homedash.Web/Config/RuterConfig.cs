namespace Homedash.Web.Config
{
    public class RuterConfig : DataSourceBaseConfig
    {
           
    }

    public class RuterEndpoint : IEndpoint
    {
        public string Name { get; set; }
        public string RelativeUri { get; set; }
    }
}