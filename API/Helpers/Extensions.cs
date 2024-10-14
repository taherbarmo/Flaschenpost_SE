using Flaschenpost_SE.Interfaces;
using Flaschenpost_SE.Services;

namespace Flaschenpost_SE.Helpers;

/// <summary>
///     Provides extension methods to configure services in the application.
/// </summary>
public static class Extensions
{
    /// <summary>
    ///     Configures necessary services, such as AutoMapper and ProductService, for dependency injection.
    /// </summary>
    /// <param name="services">The IServiceCollection where services are registered.</param>
    public static void ConfigureServices(this IServiceCollection services)
    {
        // Add AutoMapper configuration
        services.AddAutoMapper(typeof(AutoMapperProfiles));

        // Register ProductService and its interface
        services.AddScoped<IProductService, ProductService>();

        // Add HttpClient for ProductService
        services.AddHttpClient<ProductService>();
    }
}