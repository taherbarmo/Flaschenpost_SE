using System.Globalization;
using System.Text.RegularExpressions;
using AutoMapper;
using Flaschenpost_SE.DTOs;
using Flaschenpost_SE.Interfaces;
using Flaschenpost_SE.Model;
using Newtonsoft.Json;

namespace Flaschenpost_SE.Services;

/// <summary>
///     Service to manage product-related operations such as retrieving, filtering, and sorting products.
/// </summary>
public class ProductService : IProductService
{
    private readonly HttpClient _httpClient;
    private readonly IMapper _mapper;
    private readonly string _productApiUrl;

    /// <summary>
    ///     Initializes a new instance of the <see cref="ProductService" /> class.
    /// </summary>
    /// <param name="httpClient">HttpClient for external API calls.</param>
    /// <param name="mapper">AutoMapper instance for mapping objects.</param>
    /// <param name="configuration">Configuration instance to retrieve API URLs from settings.</param>
    public ProductService(HttpClient httpClient, IMapper mapper, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _mapper = mapper;
        _productApiUrl = configuration["ApiSettings:ProductApiUrl"];
    }


    /// <summary>
    ///     Retrieves filtered and sorted products based on parameters.
    /// </summary>
    /// <param name="sortOrder">The sorting order: "asc" or "desc".</param>
    /// <param name="filterByPrice">Filter products with price greater than 2€/Litre if true.</param>
    /// <returns>A list of filtered and sorted ProductDTOs.</returns>
    public async Task<List<ProductDTO>> GetFilteredAndSortedProductsAsync(string sortOrder, bool filterByPrice)
    {
        var products = await GetProductsAsync();

        // Filter products by pricePerUnitText if necessary (<= 2€/Liter)

        if (filterByPrice)
            products = products
                .Select(p => new ProductDTO
                {
                    BrandName = p.BrandName,
                    Name = p.Name,
                    Article = p.Article
                        .Where(a => ExtractPricePerLitre(a.PricePerUnitText) <=
                                    2)
                        .ToList()
                })
                .Where(p => p.Article.Any()) // Only include products that still have articles after filtering
                .ToList();

        products = products
            .Select(p => new ProductDTO
            {
                Id = p.Id,


                BrandName = p.BrandName,

                Name = p.Name,
                // Sort articles within each product based on the sortOrder
                Article = sortOrder == "asc"
                    ? p.Article.OrderBy(a => a.Price).ToList()
                    : p.Article.OrderByDescending(a => a.Price).ToList()
            })
            .ToList();
        
        products = sortOrder == "asc"
            ? products.OrderBy(p => p.Article.Min(a => a.Price)).ToList()
            : products.OrderByDescending(p => p.Article.Min(a => a.Price)).ToList();

        return products;
    }

    /// <summary>
    ///     Retrieves all products from the external data source.
    /// </summary>
    /// <returns>A list of product DTOs from the external data source.</returns>
    public async Task<List<ProductDTO>> GetProductsAsync()
    {
        try
        {
            var response = await _httpClient.GetAsync(_productApiUrl);
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();

            var products = JsonConvert.DeserializeObject<List<Product>>(json);

            var productDTOs = _mapper.Map<List<ProductDTO>>(products);
            return productDTOs;
        }
        catch (HttpRequestException ex)
        {
            // Log the exception and return an empty list or handle it as needed
            Console.WriteLine($"Error fetching products: {ex.Message}");
            return new List<ProductDTO>();
        }
    }


    /// <summary>
    ///     Extracts the price per litre from the given price text.
    /// </summary>
    /// <param name="pricePerUnitText">The price per unit text (e.g., "1,80 €/Liter").</param>
    /// <returns>The extracted price as a decimal.</returns>
    /// <exception cref="ArgumentException">Thrown when the price cannot be extracted from the text.</exception>
    private decimal ExtractPricePerLitre(string pricePerUnitText)
    {
        var match = Regex.Match(pricePerUnitText, @"\d+[\.,]?\d*");

        if (match.Success) return decimal.Parse(match.Value, new CultureInfo("de-DE"));

        throw new ArgumentException($"Invalid price: {pricePerUnitText}");
    }
}