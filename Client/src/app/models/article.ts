/**
 * Represents an article related to a product.
 */
export interface Article {
  /**
   * Unique identifier for the article.
   */
  id: number;

  /**
   * A short description of the article.
   */
  shortDescription: string;

  /**
   * The price of the article.
   */
  price: number;

  /**
   * The unit in which the article is measured.
   */
  unit: string;

  /**
   * Text representation of the price per unit, including currency and unit (e.g., "1,80 €/Liter").
   */
  pricePerUnitText: string;

  /**
   * The URL to an image of the article.
   */
  image: string;
}
