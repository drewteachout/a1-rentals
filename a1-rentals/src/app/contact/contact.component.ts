import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  address = '';
  businessHours = '';
  phone = '';
  constructor(private db: AngularFirestore) {
    this.db.collection('Contact').valueChanges().pipe((map((docs: any[]) => docs[0]))).subscribe((doc: any) => {
      this.address = doc['Address'];
      this.businessHours = doc['Business Hours'];
      this.phone = doc['Phone'];
    });
  }

  ngOnInit() {
  }

}
