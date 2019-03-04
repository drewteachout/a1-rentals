import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [AngularFirestore]
})
export class HomepageComponent implements OnInit {

  private products: any[] = [[]];
  private productsPerRow = 4;

  constructor(db: AngularFirestore) {
    db.collection('/popular').valueChanges().subscribe((popular_items: any[]) => {
      let innerCount = 0;
      let outerCount = 0;
      for (let i = 0; i < popular_items.length; i++) {
        if (innerCount === this.productsPerRow) {
          innerCount = 0;
          outerCount++;
          this.products.push([]);
        }
        this.products[outerCount].push([popular_items[i].name, popular_items[i].path]);
        innerCount++;
      }
    });
  }

  ngOnInit() {
  }

}
