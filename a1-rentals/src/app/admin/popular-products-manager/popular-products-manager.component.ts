import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-popular-products-manager',
  templateUrl: './popular-products-manager.component.html',
  styleUrls: ['./popular-products-manager.component.css']
})
export class PopularProductsManagerComponent implements OnInit {

  private popularProducts: any[] = [[]];
  private across = 4;
  constructor(private db: AngularFirestore) {
    db.collection('/popular').valueChanges().subscribe((popular: {}[]) => {
      this.popularProducts = [[]];
      console.log(popular);
      let innerCount = 0;
      let outerCount = 0;

      popular.forEach((product) => {
        if (innerCount >= this.across) {
          innerCount = 0;
          outerCount++;
          this.popularProducts.push([]);
        }
        this.popularProducts[outerCount].push(product);
        innerCount++;
      });
    });
  }

  ngOnInit() {
  }

  addProductSelected() {
    console.log('Add product Selected');
  }

  editPopularProduct(product: any) {
    console.log('Edit product selected', product);
  }

  deletePopularProduct(product: any) {
    console.log('Delete product selected', product);
  }

}
