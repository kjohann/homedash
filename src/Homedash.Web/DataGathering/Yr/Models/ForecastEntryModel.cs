using System;
using Homedash.Web.Config;
using Homedash.Web.DataGathering.Yr.Models;

public class ForecastEntryModel
{
  public DateTime From { get; set; }
  public DateTime To { get; set; }  
  public string SymbolUrl { get; set; }
  public string SymbolDescription { get; set; }
  public string PrecipitationInMillimeters { get; set; }
  public string WindSpeedInMetersPerSecond { get; set; }
  public string TemperaturesInCelcius { get; set; }

  internal static ForecastEntryModel FromModel(ForecastTimePeriodModel model, YrConfig config)
  {
    return new ForecastEntryModel
    {
      From = model.From,
      To = model.To,
      SymbolUrl = $"{config.IconEndpoint}b48/{model.Symbol.NumberEx}.png",
      SymbolDescription = model.Symbol.Name,
      PrecipitationInMillimeters = model.Precipitation.Value,
      WindSpeedInMetersPerSecond = model.WindSpeed.Mps,
      TemperaturesInCelcius = model.Temperature.Value
      // PrecipitationInMillimeters = Convert.ToDecimal(model.Precipitation.Value),
      // WindSpeedInMetersPerSecond = Convert.ToDecimal(model.WindSpeed.Mps),
      // TemperaturesInCelcius = Convert.ToInt32(model.Temperature.Value)
    };
  }
}