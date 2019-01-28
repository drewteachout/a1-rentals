import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-tile',
  templateUrl: './quote-tile.component.html',
  styleUrls: ['./quote-tile.component.css']
})

export class QuoteTileComponent implements OnInit {

  // get from parent component
  // use name to get other info from database
  name = "NAME GOES HERE";
  quant = "";

  // deletes this tile
  // edit parent component?
  deleteTile() {}

  // gets product name
  getName() { return name; }

  // gets product image
  getProductImage() { return "assets/images/temp.jpg" }

  // gets price quote
  getPrice() { return "$69.69"}

  // gets quantity
  // 
  getQuant() {}


  constructor() { }

  ngOnInit() {
  }

}
