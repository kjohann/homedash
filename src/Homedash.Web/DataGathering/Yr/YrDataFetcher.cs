using System.Net.Http;
using System.Threading.Tasks;
using System.Xml;
using Homedash.Web.Config;
using Homedash.Web.DataGathering.Yr.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Homedash.Web.DataGathering.Yr
{
  public class YrDataFetcher
  {
    private readonly IOptions<YrConfig> _options;
    public YrDataFetcher(IOptions<YrConfig> options)
    {
      _options = options;
    }
    public async Task<SimpleYrModel> Fetch()
    {
      using (var client = new HttpClient())
      {
        var response = await client.GetAsync("https://www.yr.no/sted/Norge/Akershus/Ski/Ski/varsel.xml");
        var result = await response.Content.ReadAsStringAsync();
        var doc = new XmlDocument();
        doc.LoadXml(result);

        var json = JsonConvert.SerializeXmlNode(doc);
        var model = JsonConvert.DeserializeObject<YrApiModel>(json);

        return SimpleYrModel.FromApiModel(model, _options.Value);
      }
    }
  }
}