/**
 * Represents a bottle view of a product
 */
export interface BottleViewData {
  /**
   * The brand name of the product.
   */
  brandName: string;

  /**
   * The specific name of the product.
   */
  name: string;

  /**
   * An array of image URLs representing the bottles for this product.
   */
  images: string[];
}
