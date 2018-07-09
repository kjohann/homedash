using System.Collections.Generic;

namespace Homedash.Web.Config
{
    public abstract class DataSourceBaseConfig
    {
        public string DataEndpointBase { get; set; }
        public IEnumerable<IEndpoint> DataEndpoints { get; set; }        
    }
}