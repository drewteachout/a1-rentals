import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../util/CartItem';
import { QuoteCartServiceService } from '../services/quote-cart-service.service';

@Component({
  selector: 'tr[app-quote-tile]',
  templateUrl: './quote-tile.component.html',
  styleUrls: ['./quote-tile.component.css']
})
export class QuoteTileComponent implements OnInit {

  @Input() cartItem: CartItem;
  @Output() quantityChanged = new EventEmitter();

  cartService: QuoteCartServiceService;

  constructor(cartService: QuoteCartServiceService) {
    this.cartService = cartService;
   }

  ngOnInit() {
  }

  getPrice() { return this.cartItem.getTotalCost(); }

  getProductDescription() { return this.cartItem.productDescription; }

  getQuantity() { return this.cartItem.quantity; }

  updateQuantity(value: number) {
    this.cartItem.quantity = value;
    this.cartService.updateQuantity(this.cartItem);
    this.quantityChanged.emit();
  }

}
