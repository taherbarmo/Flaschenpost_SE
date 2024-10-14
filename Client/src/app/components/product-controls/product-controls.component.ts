import { Component } from '@angular/core';
import { ViewStateService } from '../../services/view-state-service.service';


/**
 * ProductControlsComponent is responsible for handling user interactions related to sorting,
 * view type selection, and filtering products by price. It provides buttons to toggle
 * between ascending/descending sorting, detail/bottle views, and enabling/disabling price filters.
 */
@Component({
  selector: 'app-product-controls',
  templateUrl: './product-controls.component.html',
  styleUrls: ['./product-controls.component.scss'],
})
export class ProductControlsComponent {

  /**
   * Constructor to inject the ViewStateService.
   * @param viewStateService - The service that manages the shared state for sorting, filtering, and view type.
   */
  constructor(private viewStateService: ViewStateService) {}

  /**
   * Toggles the sort order between 'asc' (ascending) and 'desc' (descending),
   * and updates the ViewStateService to reflect the new sort order.
   */
  toggleSortOrder() {
    const newSortOrder =
      this.viewStateService.sortOrderSubject.value === 'asc' ? 'desc' : 'asc';
    this.viewStateService.setSortOrder(newSortOrder);
  }

  /**
   * Toggles between 'detail' and 'bottle' view types by calling the ViewStateService method.
   * This method switches the way products are displayed in the frontend.
   */
  toggleViewType() {
    this.viewStateService.toggleViewType();
  }

  /**
   * Toggles the price filter, which filters out products that are priced above 2€/liter.
   * This updates the ViewStateService with the current filter status.
   */
  toggleFilterByPrice() {
    this.viewStateService.toggleFilterByPrice();
  }

  /**
   * Returns the current label for the sort order button based on the current sort order.
   * @returns {string} The label for the sort order button.
   */
  get sortOrderLabel(): string {
    return this.viewStateService.sortOrderSubject.value === 'asc' ? 'Sort Desc' : 'Sort Asc';
  }

  /**
   * Returns the current label for the view type button based on the current view type.
   * @returns {string} The label for the view type button.
   */
  get viewTypeLabel(): string {
    return this.viewStateService.viewTypeSubject.value === 'bottle' ? 'Detail View' : 'Bottle View';
  }

  /**
   * Returns the current label for the filter button based on the current price filter state.
   * @returns {string} The label for the filter button.
   */
  get filterLabel(): string {
    return this.viewStateService.filterByPriceSubject.value ? 'Show All' : 'Filter < 2€/L';
  }
}
