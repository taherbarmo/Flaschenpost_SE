namespace Flaschenpost_SE.Model;

/// <summary>
///     Represents an article related to a product.
/// </summary>
public class Article
{
    /// <summary>
    ///     Gets or sets the article's unique identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    ///     Gets or sets the short description of the article.
    /// </summary>
    public string ShortDescription { get; set; }

    /// <summary>
    ///     Gets or sets the price of the article.
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    ///     Gets or sets the unit in which the article is measured.
    /// </summary>
    public string Unit { get; set; }

    /// <summary>
    ///     Gets or sets the price per unit text.
    /// </summary>
    public string PricePerUnitText { get; set; }

    /// <summary>
    ///     Gets or sets the URL to the image of the article.
    /// </summary>
    public string Image { get; set; }
}