using System.Collections.Generic;

// URL til symboler: http://symbol.yr.no/grafikk/sym/b48/04.png
// 48 er str i px og 04 er numberEx fra xml
// Se http://om.yr.no/info/verdata/spesifikasjon/
namespace Homedash.Web.DataGathering.Yr.Models
{
  public class TablularForecastModel
    {
        public IEnumerable<ForecastTimePeriodModel> Time { get; set; }
        
    }
}