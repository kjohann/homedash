using System;
using System.Net.Http;
using Homedash.Web.Config;
using Microsoft.Extensions.Options;

public class HttpClientProvider : IDisposable
{
  private readonly YrConfig _yrConfig;


  private HttpClient _yrClient;

  public HttpClientProvider(IOptions<YrConfig> yrOptions)
  {
      _yrConfig = yrOptions.Value;
  }

  public void Dispose()
  {
    _yrClient?.Dispose();
  }

  public HttpClient GetYrClient()
  {
    var client = _yrClient ?? (_yrClient = new HttpClient());
    
    client.BaseAddress = new Uri(_yrConfig.DataEndpointBase);

    return client;
  }
}