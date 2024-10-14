import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { BottleViewData } from '../models/bottleViewData';

/**
 * ProductService is responsible for fetching product data from the backend API.
 * It handles the retrieval of products based on sort order, price filtering, and view type.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /**
   * The base URL of the API from which the product data will be fetched.
   * It is retrieved from the environment configuration.
   */
  private apiUrl = environment.apiUrl;

  /**
   * Constructor to inject the HttpClient service for making HTTP requests.
   * @param http - The HttpClient used to make requests to the backend API.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves products from the backend based on the provided sort order, filter, and view type.
   * @param sortOrder - The order in which to sort products. Possible values are 'asc' or 'desc'.
   * @param filterByPrice - A boolean indicating whether to filter out products above 2€/Litre.
   * @param viewType - The view type to retrieve ('detail' for full product info or 'bottle' for bottle images).
   * @returns An observable of either an array of Product[] (for detail view) or BottleViewData[] (for bottle view).
   */
  getProducts(
    sortOrder: string,
    filterByPrice: boolean,
    viewType: 'detail' | 'bottle'
  ): Observable<Product[] | BottleViewData[]> {
    const params = new HttpParams()
      .set('sortOrder', sortOrder)
      .set('filterByPrice', filterByPrice.toString())
      .set('viewType', viewType);

    // Map view types to their respective data types for cleaner code.
    const viewTypeMap: {
      [key: string]: Observable<Product[] | BottleViewData[]>;
    } = {
      detail: this.http.get<Product[]>(this.apiUrl, { params }),
      bottle: this.http.get<BottleViewData[]>(this.apiUrl, { params }),
    };

    return viewTypeMap[viewType];
  }
}
