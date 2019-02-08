import { Injectable } from '@angular/core';
import { Product } from '../util/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _current_product_category: BehaviorSubject<Product>;
  constructor() { 
    this._current_product_category = new BehaviorSubject<Product>(new Product('', ''));
    this._current_product_category.next(new Product('', ''));
  }

  update(p: Product) {
    this._current_product_category.next(p);
  }

  get(): BehaviorSubject<Product>{
    return this._current_product_category;
  }
}
