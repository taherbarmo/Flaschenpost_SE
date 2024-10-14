import { Component, Input } from '@angular/core';
import { BottleViewData } from '../../models/bottleViewData';
import { Product } from '../../models/product';

/**
 * ProductCardComponent is responsible for rendering the product cards based on the view type.
 * It handles both 'detail' and 'bottle' views, displaying products or just bottle images
 * depending on the selected view type.
 */
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {

  /**
   * The list of products to display in the detail view.
   */
  @Input() products: Product[] = [];

  /**
   * The list of bottle view data to display in the bottle view.
   */
  @Input() bottleViewData: BottleViewData[] = [];

  /**
   * The current view type, which determines how the products should be displayed.
   */
  @Input() viewType: 'detail' | 'bottle' = 'detail';
}
