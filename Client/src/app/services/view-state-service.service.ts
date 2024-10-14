import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * ViewStateService is responsible for managing the shared state for sorting order,
 * view type, and price filtering across different components. It provides
 * BehaviorSubjects to store the current state and allows components to
 * subscribe to changes and update the state.
 */
@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  /**
   * BehaviorSubject to store and emit the current sorting order.
   */
  public sortOrderSubject = new BehaviorSubject<string>('asc');

  /**
   * BehaviorSubject to store and emit the current view type (either 'detail' or 'bottle').
   */
  public viewTypeSubject = new BehaviorSubject<'detail' | 'bottle'>('bottle');

  /**
   * BehaviorSubject to store and emit the current filter state for price.
   */
  public filterByPriceSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable stream for the sort order.
   */
  sortOrder$ = this.sortOrderSubject.asObservable();

  /**
   * Observable stream for the view type.
   */
  viewType$ = this.viewTypeSubject.asObservable();

  /**
   * Observable stream for the price filter state.
   */
  filterByPrice$ = this.filterByPriceSubject.asObservable();

  /**
   * Updates the sort order with the provided value.
   */
  setSortOrder(order: string) {
    this.sortOrderSubject.next(order);
  }

  /**
   * Toggles the current view type between 'detail' and 'bottle'.
   */
  toggleViewType() {
    const currentView = this.viewTypeSubject.value;
    this.viewTypeSubject.next(currentView === 'detail' ? 'bottle' : 'detail');
  }

  /**
   * Toggles the filter for price.
   */
  toggleFilterByPrice() {
    this.filterByPriceSubject.next(!this.filterByPriceSubject.value);
  }
}
