import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-tile',
  templateUrl: './quote-tile.component.html',
  styleUrls: ['./quote-tile.component.css']
})
export class QuoteTileComponent implements OnInit {

  // deletes this tile
  deleteTile() {}

  // gets product name
  getProductName() {}

  // gets product image
  getProductImage() {}

  // gets price quote
  getPrice() { return '$69.69'; }

  // gets quantity
  getQuant() {}


  constructor() { }

  ngOnInit() {
  }

}
