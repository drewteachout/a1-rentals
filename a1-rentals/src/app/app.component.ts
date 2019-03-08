import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  bannerTexts = [];

  title = 'a1-rentals';

  constructor(private db: AngularFirestore) {
    this.loadData();
  }

  loadData() {
    this.db.collection('banners').valueChanges().subscribe(items => {
      this.bannerTexts = [];
      items.forEach(item => {
        const date = Date.now() / 1000;
        if (item['start_date'].seconds <= date && item['end_date'].seconds >= date) {
          this.bannerTexts.push({ text: item['message'], display: true});
          }
      });
    });
  }

  closeNotification(text: any) {
    text.display = false;
  }
}
