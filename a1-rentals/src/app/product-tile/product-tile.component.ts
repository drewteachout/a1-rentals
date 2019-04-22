import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {

  @Input() productName: string;
  @Input() productSource: string;
  @Input() path: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToPath() {
    if (this.path !== undefined) {
      this.router.navigateByUrl('/Rental Products/' + this.path);
    }
  }

}
