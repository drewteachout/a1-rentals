import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [AngularFirestore]
})
export class HomepageComponent implements OnInit {

  products: any[] = [];

  constructor(db: AngularFirestore) {
    db.collection('/popular').valueChanges().subscribe((popular_items: any[]) => {
      for (let i = 0; i < popular_items.length; i++) {
        this.products[i] = [popular_items[i].name, popular_items[i].path];
      }
    });
  }

  ngOnInit() {
  }

}
