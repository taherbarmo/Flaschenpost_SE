using Flaschenpost_SE.DTOs;

namespace Flaschenpost_SE.Interfaces;

/// <summary>
///     Defines methods for product-related operations such as retrieving, filtering, and sorting products.
/// </summary>
public interface IProductService
{
    /// <summary>
    ///     Retrieves all products with optional filtering and sorting.
    /// </summary>
    /// <param name="sortOrder">The sorting order: "asc" or "desc".</param>
    /// <param name="filterByPrice">Filter products with price greater than 2€/Litre if true.</param>
    /// <returns>A list of filtered and sorted ProductDTOs.</returns>
    Task<List<ProductDTO>> GetFilteredAndSortedProductsAsync(string sortOrder, bool filterByPrice);
}