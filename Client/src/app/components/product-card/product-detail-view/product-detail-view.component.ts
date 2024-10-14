import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';

/**
 * ProductDetailViewComponent is responsible for rendering the detailed product view.
 */
@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent {

  /**
   * The detailed product data for a single product.
  */
 @Input() product!: Product;
}
