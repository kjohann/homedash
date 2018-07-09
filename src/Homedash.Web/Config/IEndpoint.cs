namespace Homedash.Web.Config
{
  public interface IEndpoint
    {
        string Name { get; set; }
        string RelativeUri { get; set; }
    }
}