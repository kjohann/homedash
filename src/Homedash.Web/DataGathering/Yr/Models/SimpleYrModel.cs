using System;
using System.Collections.Generic;
using System.Linq;
using Homedash.Web.Config;
using Homedash.Web.DataGathering.Yr.Models;

public class SimpleYrModel
{
  public DateTime LastUpdated { get; set; }
  public DateTime SunRise { get; set; }
  public DateTime SunDown { get; set; }
  public IEnumerable<ForecastEntryModel> ForecastData { get; set; }

  public static SimpleYrModel FromApiModel(YrApiModel model, YrConfig config)
  {
    return new SimpleYrModel
    {
      LastUpdated = model.Weatherdata.Meta.LastUpdate,
      SunRise = model.Weatherdata.Sun.Rise,
      SunDown = model.Weatherdata.Sun.Set,
      ForecastData = model.Weatherdata.Forecast.Tabular.Time.Take(4).Select(m => ForecastEntryModel.FromModel(m, config))
    };
  }
}
