import { Component, OnInit, Input } from '@angular/core';
import { Cart_Item } from '../util/Cart_Item';


@Component({
  selector: 'app-quote-tile',
  templateUrl: './quote-tile.component.html',
  styleUrls: ['./quote-tile.component.css']
})
export class QuoteTileComponent implements OnInit {

  @Input() cartItem: Cart_Item
  
  getPrice() { return this.cartItem.getTotalCost()}

  getProductDescription() { return this.cartItem.productDescription}

  getQuantity() { return this.cartItem.quantity}

  updateQuantity(value: number) {
    this.cartItem.quantity = value;
  }

  constructor() { }

  ngOnInit() {
    console.log(this.cartItem.productName)
  }

}
