using System.Collections.Generic;

namespace Homedash.Web.Config
{
    public class YrConfig
    {
        public string DataEndpointBase { get; set; }
        public string IconEndpoint { get; set; }
        public IEnumerable<YrDataEndpoint> DataEndpoints { get; set; }
    }

    public class YrDataEndpoint
    {
        public string Name { get; set; }
        public string RelativeUri { get; set; }
    }
}