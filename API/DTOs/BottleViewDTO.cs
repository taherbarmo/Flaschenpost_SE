namespace Flaschenpost_SE.DTOs;

/// <summary>
///     DTO representing the bottle view of a product.
/// </summary>
public class BottleViewDTO
{
    /// <summary>
    ///     The brand name of the product.
    /// </summary>
    public string BrandName { get; set; }

    /// <summary>
    ///     The name of the product.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    ///     A list of images of the product's articles.
    /// </summary>
    public List<string> Images { get; set; }
}