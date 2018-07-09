namespace Homedash.Web.DataGathering.Ruter.ApiModels
{
  public class MonitoredVehicleJourneyModel 
    {
        public string PublishedLineName { get; set; }
        public string DestinationName { get; set; }
        public MonitoredCallModel MonitoredCall { get; set; }

    }
}