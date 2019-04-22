import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../util/CartItem';

@Component({
  selector: 'tr[app-quote-tile]',
  templateUrl: './quote-tile.component.html',
  styleUrls: ['./quote-tile.component.css']
})
export class QuoteTileComponent implements OnInit {

  @Input() cartItem: CartItem;

  constructor() { }

  ngOnInit() {
    console.log(this.cartItem.productName);
  }

  getPrice() { return this.cartItem.getTotalCost(); }

  getProductDescription() { return this.cartItem.productDescription; }

  getQuantity() { return this.cartItem.quantity; }

  updateQuantity(value: number) {
    this.cartItem.quantity = value;
  }

}
