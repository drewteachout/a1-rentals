import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-popular-products-manager',
  templateUrl: './popular-products-manager.component.html',
  styleUrls: ['./popular-products-manager.component.css']
})
export class PopularProductsManagerComponent implements OnInit {

  popularProducts: any[] = [[]];
  private numColumns = 5;
  constructor(private db: AngularFirestore) {
    for (let i = 0; i < this.numColumns; i++) {
      this.popularProducts.push([]);
    }
    this.loadData();
  }

  ngOnInit() {
  }

  addProductSelected() {
    console.log('Add product Selected');
  }

  loadData() {
    this.db.collection('/popular').valueChanges().subscribe((popular_items: any[]) => {
      this.popularProducts = []
      for (let i = 0; i < this.numColumns; i++) {
        this.popularProducts.push([]);
      }
      for (let i = 0; i < popular_items.length; i++) {
        const key = i % this.numColumns;
        const data = this.popularProducts[key];
        data.push([popular_items[i].name,
          popular_items[i].storage_path,
          popular_items[i].path,
          popular_items[i].db_name]);
        this.popularProducts[key] = data;
      }
    });
  }
}
