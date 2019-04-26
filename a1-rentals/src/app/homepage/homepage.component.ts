import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [AngularFirestore]
})
export class HomepageComponent implements OnInit {

  public numColumns = 5;

  productData = [];

  constructor(private db: AngularFirestore) {
    this.loadData();
  }

  ngOnInit() {
  }

  loadData() {
    this.db.collection('/popular').valueChanges().subscribe((popular_items: any[]) => {
      this.productData = [];
      const popular_items_sorted = popular_items.sort((a: any, b: any) => a.display_order - b.display_order)
      for (let i = 0; i < popular_items_sorted.length; i++) {
        const key = Math.floor(i / this.numColumns);
        let data = this.productData[key];
        if (data === undefined) {
          this.productData.push([]);
          data = this.productData[key];
        }
        data.push([popular_items_sorted[i].name, popular_items_sorted[i].image_url, popular_items_sorted[i].path]);
        this.productData[key] = data;
      }
    });
  }
}
