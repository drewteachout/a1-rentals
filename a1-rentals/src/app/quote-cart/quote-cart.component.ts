import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartItem } from '../util/CartItem';
import { QuoteCartServiceService } from '../services/quote-cart-service.service';

@Component({
  selector: 'app-quote-cart',
  templateUrl: './quote-cart.component.html',
  styleUrls: ['./quote-cart.component.css']
})
export class QuoteCartComponent implements OnInit {

  cartService: QuoteCartServiceService;
  cart: CartItem[] = [];
  quote: String = 'qoute';

  constructor(cartService: QuoteCartServiceService) {
    this.cartService = cartService;
    this.cartService.get().subscribe((newCart: CartItem[]) => {
      this.cart = [];
      for (let i = 0; i < newCart.length; i++) {
        this.cart.push(newCart[i]);
      }
    });
  }

  ngOnInit() {
    console.log(this.cart);
  }

  deleteTile(cartItem: CartItem) {
    const newCart: CartItem[] = [];
    this.cart = this.cart.filter((a) => a.productName !== cartItem.productName);
    this.cartService.update(this.cart);
    console.log(cartItem.productName);
  }

}
