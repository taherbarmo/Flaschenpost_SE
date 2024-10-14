using AutoMapper;
using Flaschenpost_SE.DTOs;
using Flaschenpost_SE.Model;

/// <summary>
///     Configuration class for AutoMapper mappings between model and DTOs.
/// </summary>
public class AutoMapperProfiles : Profile
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="AutoMapperProfiles" /> class.
    ///     Configures the mappings between model classes and DTO classes.
    /// </summary>
    public AutoMapperProfiles()
    {
        // Mapping Product to ProductDTO
        CreateMap<Product, ProductDTO>()
            .ForMember(dest => dest.Article, opt => opt.MapFrom(src => src.Articles));

        // Mapping Article to ArticleDTO
        CreateMap<Article, ArticleDTO>();
    }
}