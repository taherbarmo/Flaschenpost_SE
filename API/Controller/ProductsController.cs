using Flaschenpost_SE.DTOs;
using Flaschenpost_SE.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Flaschenpost_SE.Controller;

/// <summary>
///     API Controller for managing products.
///     Provides endpoints to retrieve filtered and sorted products.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    /// <summary>
    ///     Initializes a new instance of the <see cref="ProductController" /> class.
    /// </summary>
    /// <param name="productService">Service to handle product-related operations.</param>
    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    /// <summary>
    ///     Gets filtered and sorted products with support for different views.
    /// </summary>
    /// <param name="sortOrder">Sort order for products, either "asc" for ascending or "desc" for descending.</param>
    /// <param name="filterByPrice">If true, filters out products that have a price greater than 2€/Litre.</param>
    /// <param name="viewType">
    ///     The view type for displaying the products: "detail" (default) for full details or "bottle" for
    ///     image-only view.
    /// </param>
    /// <returns>An <see cref="IActionResult" /> containing either the filtered and sorted product data or the bottle view.</returns>
    [HttpGet]
    public async Task<IActionResult> GetProducts(
        string sortOrder = "asc",
        bool filterByPrice = false,
        string viewType = "detail") // ViewType: "detail" or "bottle"
    {
        var products = await _productService.GetFilteredAndSortedProductsAsync(sortOrder, filterByPrice);

        // Handle "bottle" view: Return only the images for the bottle view
        if (viewType == "bottle")
        {
            var bottleViewData = products.Select(p => new BottleViewDTO
            {
                BrandName = p.BrandName,
                Name = p.Name,
                Images = p.Article.Select(a => a.Image).ToList()
            }).ToList();

            return Ok(bottleViewData);
        }


        return Ok(products);
    }
}