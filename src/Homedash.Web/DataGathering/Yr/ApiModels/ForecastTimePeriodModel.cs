using System;
using Newtonsoft.Json;

// URL til symboler: http://symbol.yr.no/grafikk/sym/b48/04.png
// 48 er str i px og 04 er numberEx fra xml
// Se http://om.yr.no/info/verdata/spesifikasjon/
namespace Homedash.Web.DataGathering.Yr.Models
{
  public class ForecastTimePeriodModel
    {
        [JsonProperty("@from")]
        public DateTime From { get; set; }
        [JsonProperty("@to")]
        public DateTime To { get; set; }
        public ForecastSymbolModel Symbol { get; set; }
        public ForecastPrecipitationnModel Precipitation { get; set; }
        public ForecastWindSpeedModel WindSpeed { get; set; }
        public ForecastTemperatureModel Temperature { get; set; }
    }
}