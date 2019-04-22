import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../util/CartItem';
import { QuoteCartServiceService } from '../services/quote-cart-service.service';

@Component({
  selector: 'tr[app-quote-tile]',
  templateUrl: './quote-tile.component.html',
  styleUrls: ['./quote-tile.component.css']
})
export class QuoteTileComponent implements OnInit {

  @Input() cartItem: CartItem;

  cartService: QuoteCartServiceService;

  constructor(cartService: QuoteCartServiceService) {
    this.cartService = cartService;
   }

  ngOnInit() {
    console.log(this.cartItem.productName);
  }

  getPrice() { return this.cartItem.getTotalCost(); }

  getProductDescription() { return this.cartItem.productDescription; }

  getQuantity() { return this.cartItem.quantity; }

  updateQuantity(value: number) {
    console.log('Value: ', value);
    this.cartItem.quantity = value;
    this.cartService.updateQuantity(this.cartItem);
  }

}
