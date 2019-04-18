import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-tile',
  templateUrl: './admin-product-tile.component.html',
  styleUrls: ['./admin-product-tile.component.css']
})
export class AdminProductTileComponent implements OnInit {

  @Input() productName: string;
  @Input() productSource: string;
  @Input() path: string;
  @Input() db_name: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  editPopularProductSelected() {
    console.log('Edit product selected');
    console.log(this.db_name);
  }

  deletePopularProductSelected() {
    console.log('Delete product selected');
    console.log(this.db_name);
  }
}
