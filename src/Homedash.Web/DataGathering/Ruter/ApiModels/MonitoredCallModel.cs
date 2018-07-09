using System;

namespace Homedash.Web.DataGathering.Ruter.ApiModels
{
  public class MonitoredCallModel
    {
        public DateTime AimedArrivalTime { get; set; }
        public DateTime ExpectedArrivalTime { get; set; }
        public DateTime AimedDepartureTime { get; set; }
        public DateTime ExpectedDepartureTime { get; set; }
        public string DeparturePlatformName { get; set; }
    }
}