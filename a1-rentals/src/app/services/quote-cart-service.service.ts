import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart_Item } from '../util/Cart_Item';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'pure-awesomeness';

@Injectable()
export class QuoteCartServiceService {
  private _quote_cart_items: BehaviorSubject<Cart_Item[]>;
  private dataStore: {
    quote_cart_items: Cart_Item[];
  };

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
    this.dataStore = { quote_cart_items: [] };
    this._quote_cart_items = <BehaviorSubject<Cart_Item[]>>new BehaviorSubject([]);
    this._quote_cart_items.next([new Cart_Item('Elite Pole Tent 1', 5,
      'The most elite pole tent money can buy buy buy buy buy buy buy buy buy', 100),
    new Cart_Item('Elite Pole Tent 2', 5, 'The most elite pole tent money can buy', 100),
    new Cart_Item('Elite Pole Tent 3', 5, 'The most elite pole tent money can buy', 100),
    new Cart_Item('Elite Pole Tent 4', 5, 'The most elite pole tent money can buy', 100)]);
    sessionStorage.setItem(STORAGE_KEY,  JSON.stringify([]));
  }

  public addToCart(obj: any) {
    console.log('Added these items to cart: ', obj);
    const oldData = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    console.log('OldData: ', oldData);
    const newData = [];
    for (let i = 0; i < oldData.length; i++) {
      newData.push(oldData[i]);
    }
    for (let i = 0; i < obj.length; i++) {
      newData.push(obj[i]);
    }
    console.log('NewData: ', newData);
    sessionStorage.setItem(STORAGE_KEY,  JSON.stringify(newData));
    console.log('Added these items to session storage: ', JSON.parse(sessionStorage.getItem(STORAGE_KEY)));
  }

  update(cart: Cart_Item[]) {
    this._quote_cart_items.next(cart);
  }

  get(): BehaviorSubject<Cart_Item[]>{
    return this._quote_cart_items;
  }
}
