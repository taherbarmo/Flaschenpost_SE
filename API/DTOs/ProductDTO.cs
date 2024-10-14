namespace Flaschenpost_SE.DTOs;

/// <summary>
///     Data Transfer Object (DTO) representing a product.
/// </summary>
public class ProductDTO
{
    /// <summary>
    ///     Gets or sets the product's unique identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    ///     Gets or sets the brand name of the product.
    /// </summary>
    public string BrandName { get; set; }

    /// <summary>
    ///     Gets or sets the name of the product.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    ///     Gets or sets the list of articles associated with this product.
    /// </summary>
    public List<ArticleDTO> Article { get; set; }
}