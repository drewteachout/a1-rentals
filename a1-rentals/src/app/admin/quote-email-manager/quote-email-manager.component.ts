import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from 'angularfire2/firestore';

@Component({
  selector: 'app-quote-email-manager',
  templateUrl: './quote-email-manager.component.html',
  styleUrls: ['./quote-email-manager.component.css']
})
export class QuoteEmailManagerComponent implements OnInit {

  quoteEmail = '';

  constructor(private db: AngularFirestore) {
    this.db.collection('Contact').valueChanges().subscribe(docList => {
      this.quoteEmail = docList[0]['contact_email'];
    });
  }

  ngOnInit() {
  }

  changeEmail() {
    this.db.collection('Contact').ref.get().then((query) => {
      query.docs.forEach((doc) => {
        doc.ref.update({
          contact_email: this.quoteEmail
        });
      });
      alert('Quote email changed successfully to ' + this.quoteEmail);
    });
  }

}
