using Newtonsoft.Json;

// URL til symboler: http://symbol.yr.no/grafikk/sym/b48/04.png
// 48 er str i px og 04 er numberEx fra xml
// Se http://om.yr.no/info/verdata/spesifikasjon/
namespace Homedash.Web.DataGathering.Yr.Models
{
  public class ForecastPrecipitationnModel
    {
        [JsonProperty("@value")]
        public string Value { get; set; }
        [JsonProperty("@minvalue")]
        public string Minvalue { get; set; }
        [JsonProperty("@maxvalue")]
        public string Maxvalue { get; set; }
    }
}