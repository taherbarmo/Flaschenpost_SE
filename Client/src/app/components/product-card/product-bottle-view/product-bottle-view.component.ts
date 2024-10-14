import { Component, Input } from '@angular/core';
import { BottleViewData } from '../../../models/bottleViewData';

/**
 * ProductBottleViewComponent is responsible for rendering the product bottle view.
 * It displays only the bottle images.
 */
@Component({
  selector: 'app-product-bottle-view',
  templateUrl: './product-bottle-view.component.html',
  styleUrls: ['./product-bottle-view.component.scss']
})
export class ProductBottleViewComponent {

  /**
   * The bottle view data for a single product.
   */
  @Input() product!: BottleViewData;
}
