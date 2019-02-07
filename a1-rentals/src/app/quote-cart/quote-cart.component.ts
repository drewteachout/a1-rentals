import { Component, OnInit } from '@angular/core';
import { Cart_Item } from '../util/Cart_Item';
import { QuoteCartServiceService } from '../services/quote-cart-service.service';

@Component({
  selector: 'app-quote-cart',
  templateUrl: './quote-cart.component.html',
  styleUrls: ['./quote-cart.component.css']
})
export class QuoteCartComponent implements OnInit {

  cartService: QuoteCartServiceService
  cart: Cart_Item[] = [];
  quote: String = "qoute";

  constructor(cartService: QuoteCartServiceService) {
    this.cartService = cartService;
    this.cartService.get().subscribe((newCart: Cart_Item[]) => {
      this.cart = [];
      for(let i = 0; i < newCart.length; i++) {
        this.cart.push(newCart[i]);
      }
    });
  }

  ngOnInit() {  
    console.log(this.cart);
  }

  deleteTile(cartItem: Cart_Item) {
    let newCart: Cart_Item[] = [];
    this.cart = this.cart.filter((a) => a.productName != cartItem.productName);
    this.cartService.update(this.cart);
    console.log(cartItem.productName);
  }

}
