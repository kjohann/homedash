using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Homedash.Web.Config;
using Homedash.Web.DataGathering.Ruter.ApiModels;
using Homedash.Web.DataGathering.Ruter.Models;
using Microsoft.Extensions.Options;

namespace Homedash.Web.DataGathering.Ruter
{
    public class RuterDataFetcher
    {
        private HttpClient _client;
        private RuterConfig _config;

        public RuterDataFetcher(HttpClientProvider httpClientProvider, IOptions<RuterConfig> options)
        {
            _client = httpClientProvider.GetRuterClient();
            _config = options.Value;
        }

        public async Task<IEnumerable<RuterModel>> Fetch()
        {
            var collectionTasks = _config.DataEndpoints.Select(async endpoint => 
            {
                var response = await _client.GetAsync(endpoint.RelativeUri);
                return await response.Content.ReadAsAsync<DepartureModel>();
            });
            await Task.WhenAll(collectionTasks);
            var models = collectionTasks.Select(t => t.Result);
            return null;
        }
    }
}