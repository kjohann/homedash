using System;
using Homedash.Web.DataGathering.Ruter.ApiModels;

namespace Homedash.Web.DataGathering.Ruter.Models
{
    public class RuterModel
    {
        public DateTime LastUpdated { get; set; }
        public string LineNumber { get; set; }
        public string Destination { get; set; }
        public int ExpectedArrivalDelay { get; set; }
        public int ExpectedDepartureDelay { get; set; }
        public string FromPlatform { get; set; }

        public static RuterModel FromApiModel(DepartureModel model)
        {
            return new RuterModel
            {
                LastUpdated = model.RecordedAtTime,
                LineNumber = model.MonitoredVehicleJourney.PublishedLineName,
                Destination = model.MonitoredVehicleJourney.DestinationName,
                ExpectedArrivalDelay = (model.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime - model.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime).Minutes,
                ExpectedDepartureDelay = (model.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime - model.MonitoredVehicleJourney.MonitoredCall.AimedDepartureTime).Minutes,
                FromPlatform = model.MonitoredVehicleJourney.MonitoredCall.DeparturePlatformName
            };
        }
    }
}