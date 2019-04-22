import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../util/CartItem';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'INTENTS FOR TENTS';

@Injectable()
export class QuoteCartServiceService {
  private _quote_CartItems: BehaviorSubject<CartItem[]>;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
    sessionStorage.setItem(STORAGE_KEY,  JSON.stringify([]));
  }

  public addToCart(newItems: any, isPackage: boolean) {
    const oldData = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    const newData = [];
    oldData.forEach(item => {
      const cartReady = new CartItem(item['productName'], item['productDescription'], item['quantity'], item['price']);
      newData.push(cartReady);
    });
    if (isPackage) {

    } else {
      newItems.forEach(item => {
        let duplicate = false;
        newData.forEach(oldItem => {
          if (item['productName'] === oldItem['productName']) {
            oldItem.setQuantity(item['quantity'] + oldItem['quantity']);
            duplicate = true;
          }
        });
        if (!duplicate) {
          newData.push(item);
        }
      });
    }
    sessionStorage.setItem(STORAGE_KEY,  JSON.stringify(newData));
  }

  public getCart(): CartItem[] {
    const cart = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    const cartItems = [];
    cart.forEach(item => {
      const temp = new CartItem(item['productName'], item['productDescription'], item['quantity'], item['price']);
      cartItems.push(temp);
    });
    return cartItems;
  }

  public updateCart(items: any) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  public updateQuantity(updatedItem: CartItem) {
    const oldData = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    const newData = [];
    oldData.forEach(item => {
      if (item['productName'] === updatedItem['productName']) {
        item['quantity'] = updatedItem['quantity'];
      }
      const cartReady = new CartItem(item['productName'], item['productDescription'], item['quantity'], item['price']);
      newData.push(cartReady);
    });
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }
}
