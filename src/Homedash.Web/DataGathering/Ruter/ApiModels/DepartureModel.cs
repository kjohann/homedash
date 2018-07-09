using System;

namespace Homedash.Web.DataGathering.Ruter.ApiModels
{
  public class DepartureModel
    {
        public DateTime RecordedAtTime { get; set; }
        public MonitoredVehicleJourneyModel MonitoredVehicleJourney { get; set; }
        
    }
}