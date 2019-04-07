import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {

  @Input() productName: string;
  @Input() productSource: string;

  constructor() {
  }

  ngOnInit() {
  }

}
