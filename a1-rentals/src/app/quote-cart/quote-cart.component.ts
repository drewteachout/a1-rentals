import { Component, OnInit } from '@angular/core';
import { Cart_Item } from '../util/Cart_Item';
import { QuoteCartServiceService } from '../quote-cart-service.service';

@Component({
  selector: 'app-quote-cart',
  templateUrl: './quote-cart.component.html',
  styleUrls: ['./quote-cart.component.css']
})
export class QuoteCartComponent implements OnInit {

  cartService: QuoteCartServiceService
  cart: Cart_Item[] = [new Cart_Item("Elite Pole Tent 1", 5, "The most elite pole tent money can buy buy buy buy buy buy buy buy buy", 100),
  new Cart_Item("Elite Pole Tent 2", 5, "The most elite pole tent money can buy", 100),
  new Cart_Item("Elite Pole Tent 3", 5, "The most elite pole tent money can buy", 100),
  new Cart_Item("Elite Pole Tent 4", 5, "The most elite pole tent money can buy", 100)];
  quote: String = "qoute";

  constructor(cartService: QuoteCartServiceService) {
    this.cartService = cartService;
    this.cartService.update(this.cart);
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
