import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart_Item } from '../util/Cart_Item';

@Injectable({
  providedIn: 'root'
})
export class QuoteCartServiceService {
  private _quote_cart_items: BehaviorSubject<Cart_Item[]>;
  private dataStore: { 
    quote_cart_items: Cart_Item[];
  };

  constructor() {
    this.dataStore = { quote_cart_items: [] };
    this._quote_cart_items = <BehaviorSubject<Cart_Item[]>>new BehaviorSubject([]);
    this._quote_cart_items.next([new Cart_Item("Elite Pole Tent 1", 5, "The most elite pole tent money can buy buy buy buy buy buy buy buy buy", 100),
    new Cart_Item("Elite Pole Tent 2", 5, "The most elite pole tent money can buy", 100),
    new Cart_Item("Elite Pole Tent 3", 5, "The most elite pole tent money can buy", 100),
    new Cart_Item("Elite Pole Tent 4", 5, "The most elite pole tent money can buy", 100)]);
  }

  update(cart: Cart_Item[]) {
    this._quote_cart_items.next(cart);
  }

  get(): BehaviorSubject<Cart_Item[]>{
    return this._quote_cart_items;
  }
}
