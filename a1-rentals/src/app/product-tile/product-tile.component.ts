import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {

  @Input() productName: string;
  @Input() productSource: string;
  storedImageURL: Observable<any>;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit() {
    console.log(this.productSource);
    this.storedImageURL = this.storage.ref(this.productSource).getDownloadURL();
  }

}
