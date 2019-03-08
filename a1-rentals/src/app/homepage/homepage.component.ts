import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [AngularFirestore]
})
export class HomepageComponent implements OnInit {

  private numColumns = 5;

  productData = [];

  constructor(private db: AngularFirestore) {
    for (let i = 0; i < this.numColumns; i++) {
      this.productData.push([]);
    }
    this.loadData();
  }

  ngOnInit() {
  }

  loadData() {
    this.db.collection('/popular').valueChanges().subscribe((popular_items: any[]) => {
      for (let i = 0; i < popular_items.length; i++) {
        const key = i % this.numColumns;
        const data = this.productData[key];
        data.push([popular_items[i].name, popular_items[i].path]);
        this.productData[key] = data;
      }
    });
  }
}
