import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../util/CartItem';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'pure-awesomeness';

@Injectable()
export class QuoteCartServiceService {
  private _quote_CartItems: BehaviorSubject<CartItem[]>;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
    sessionStorage.setItem(STORAGE_KEY,  JSON.stringify([]));
  }

  public addToCart(obj: any, description: string, isPackage: boolean) {
    console.log('Added these items to cart: ', obj);
    const oldData = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    console.log('OldData: ', oldData);
    const newData = [];
    for (let i = 0; i < oldData.length; i++) {
      console.log('OldData: ', oldData[i]);
      const item = new CartItem(oldData[i]['productName'], oldData[i]['productDescription'],
                                oldData[i]['quantity'], oldData[i]['perUnitPrice']);
      newData.push(item);
    }
    if (isPackage) {

    } else {
      for (let i = 0; i < obj.length; i++) {
        const item = new CartItem(obj[i][0], description, +obj[i][obj[i].length - 1], +obj[i][obj[i].length - 2]);
        newData.push(item);
      }
    }

    console.log('NewData: ', newData);
    sessionStorage.setItem(STORAGE_KEY,  JSON.stringify(newData));
    console.log('Added these items to session storage: ', JSON.parse(sessionStorage.getItem(STORAGE_KEY)));
  }

  public getCart(): CartItem[] {
    const cart = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    const cartItems = [];
    cart.forEach(item => {
      const temp = new CartItem(item['productName'], item['productDescription'], item['quantity'], item['per_unit_price']);
      cartItems.push(temp);
    });

    return cartItems;
  }

  update(cart: CartItem[]) {
    this._quote_CartItems.next(cart);
  }

  get(): BehaviorSubject<CartItem[]> {
    return this._quote_CartItems;
  }
}
