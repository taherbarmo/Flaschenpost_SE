import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { ViewStateService } from '../../services/view-state-service.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { BottleViewData } from '../../models/bottleViewData';

/**
 * MainViewComponent is responsible for managing the display of product data.
 * It listens for state changes (sort order, view type, filter) and updates
 * the displayed products accordingly. The component supports both the detail
 * and bottle views, and it handles sorting and filtering.
 */
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit, OnDestroy {
  /** List of products for the detail view */
  products: Product[] = [];

  /** List of bottle view data */
  bottleViewData: BottleViewData[] = [];

  /** Current sort order, either 'asc' or 'desc' */
  sortOrder: string = 'asc';

  /** Current view type, either 'detail' or 'bottle' */
  viewType: 'detail' | 'bottle' = 'bottle';

  /** Filter flag, determines whether to filter out products priced over 2€/liter */
  filterByPrice: boolean = false;

  /** List of subscriptions for managing observable subscriptions */
  subscriptions: Subscription[] = [];

  /**
   * Constructor that injects the required services.
   * @param viewStateService - The service that manages the shared view state (sort, view, and filter states).
   * @param productService - The service for fetching and managing product data.
   */
  constructor(
    private viewStateService: ViewStateService,
    private productService: ProductService
  ) {}

  /**
   * Initializes the component and subscribes to view state changes.
   * It uses combineLatest to listen for changes in sort order, view type,
   * and filter criteria and updates the displayed products accordingly.
   */
  ngOnInit(): void {
    const combinedState$ = combineLatest([
      this.viewStateService.sortOrder$,
      this.viewStateService.viewType$,
      this.viewStateService.filterByPrice$,
    ]);

    const stateSubscription = combinedState$.subscribe(
      ([sortOrder, viewType, filterByPrice]) => {
        this.sortOrder = sortOrder;
        this.viewType = viewType;
        this.filterByPrice = filterByPrice;
        this.loadProducts();
      }
    );

    // Store subscription for cleanup
    this.subscriptions.push(stateSubscription);
  }

  /**
   * Loads the products based on the current state (sort order, view type, and filter).
   * Depending on the view type, it updates either the `products` array (for detail view)
   * or the `bottleViewData` array (for bottle view).
   */
  loadProducts() {
    this.productService
      .getProducts(this.sortOrder, this.filterByPrice, this.viewType)
      .subscribe((data: Product[] | BottleViewData[]) => {
        if (this.viewType === 'bottle') {
          this.bottleViewData = data as BottleViewData[];
          this.products = [];
        } else {
          this.products = data as Product[];
          this.bottleViewData = [];
        }
      });
  }

  /**
   * Cleans up by unsubscribing from all subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
