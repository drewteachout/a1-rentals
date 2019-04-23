import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { QuoteCartServiceService } from '../services/quote-cart-service.service';
import { CartItem } from '../util/CartItem';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers: [AngularFirestore]
})
export class PackagesComponent implements OnInit {

  private numColumns = 3;

  cartService: QuoteCartServiceService;
  packageData = [];

  constructor(private db: AngularFirestore, cartService: QuoteCartServiceService) {
    this.cartService = cartService;
    this.loadData();
   }

  ngOnInit() {
  }

  loadData() {
    this.db.collection('packages').valueChanges().subscribe((packages: any[]) => {
      for (let i = 0; i < this.numColumns; i++) {
        this.packageData.push([]);
      }
      const packageMap = new Map();
      packages.forEach(pck => {
        packageMap.set(pck['display_order'], pck);
      });
      console.log(packageMap);
      for (let i = 0; i < packages.length; i++) {
        const key = i % this.numColumns;
        const data = this.packageData[key];
        const imageUrls = [];
        console.log(i + 1);
        console.log(packageMap.get(i + 1));
        packageMap.get(i + 1).image_urls.forEach(imgUrl => {
          imageUrls.push({ url: imgUrl });
        });
        data.push([packageMap.get(i + 1).name, imageUrls, packageMap.get(i + 1).description,
          packageMap.get(i + 1).price, packageMap.get(i + 1).items]);
        this.packageData[key] = data;
      }
      console.log(this.packageData);
    });
  }

  addSelectionToCart(pckg) {
    const cartPackage = new CartItem(pckg[0], pckg[2], 1, pckg[3]);
    this.cartService.addToCart([cartPackage]);
  }
}
