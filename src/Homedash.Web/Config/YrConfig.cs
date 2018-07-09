using System.Collections.Generic;

namespace Homedash.Web.Config
{

    public class YrConfig : DataSourceBaseConfig
    {
        public string IconEndpoint { get; set; }
    }

    public class YrDataEndpoint : IEndpoint
    {
        public string Name { get; set; }
        public string RelativeUri { get; set; }
    }
}