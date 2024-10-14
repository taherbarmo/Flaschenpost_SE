import { Article } from './article';

/**
 * Represents a product in the system.
 */
export interface Product {
  /**
   * Unique identifier for the product.
   */
  id: number;

  /**
   * The brand name of the product.
   */
  brandName: string;

  /**
   * The specific name of the product.
   */
  name: string;

  /**
   * A list of articles related to this product.
   */
  article: Article[];
}
