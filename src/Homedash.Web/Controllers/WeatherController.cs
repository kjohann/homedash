using Homedash.Web.DataGathering.Yr;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homedash.Web.Controllers
{
    [Route("api/[controller]")]
    public class WeatherController : Controller
    {
        private readonly YrDataFetcher _fetcher;

        public WeatherController(YrDataFetcher fetcher)
        {
            _fetcher = fetcher;
        }

        [HttpGet("")]
        public async Task<IActionResult> Get()
        {
            var res = await _fetcher.Fetch();
            return Ok(res);
        }
    }
}
