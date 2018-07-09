using System;
using System.Net.Http;
using Homedash.Web.Config;
using Microsoft.Extensions.Options;

public class HttpClientProvider : IDisposable
{
    private readonly YrConfig _yrConfig;
    private readonly RuterConfig _ruterConfig;


    private HttpClient _yrClient;
    private HttpClient _ruterClient;

    public HttpClientProvider(
        IOptions<YrConfig> yrOptions,
        IOptions<RuterConfig> ruterOptions
    )
    {
        _yrConfig = yrOptions.Value;
    }

    public void Dispose()
    {
        _yrClient?.Dispose();
        _ruterClient?.Dispose();
    }

    public HttpClient GetYrClient()
    {
        var client = _yrClient ?? (_yrClient = new HttpClient());
        client.BaseAddress = new Uri(_yrConfig.DataEndpointBase);
        return client;
    }

    public HttpClient GetRuterClient()
    {
        var client = _ruterClient ?? (_ruterClient = new HttpClient());
        client.BaseAddress = new Uri(_ruterConfig.DataEndpointBase);
        return client;
    }
}