import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-info-manager',
  templateUrl: './contact-info-manager.component.html',
  styleUrls: ['./contact-info-manager.component.css']
})
export class ContactInfoManagerComponent implements OnInit {

  editingAddress = false;
  editingPhone = false;
  editingBusinessHours = false;
  newBusinessHours: string;
  newAddress: string;
  newPhone: string;
  contactObj = {Address: '', 'Business Hours': '', Phone: ''};
  constructor(private db: AngularFirestore) {
    this.db.collection('Contact').valueChanges().pipe(map((docs) => {
      return docs[0];
    })).subscribe((doc: any) => {
      this.contactObj = doc;
      this.newBusinessHours = doc['Business Hours'];
      this.newAddress = doc['Address'];
      this.newPhone = doc['Phone'];
    });
  }

  ngOnInit() {
  }

  toggleAddressEditing() {
    this.editingAddress = !this.editingAddress;
  }

  togglePhoneEditing() {
    this.editingPhone = !this.editingPhone;
  }

  toggleBusinessHoursEditing() {
    this.editingBusinessHours = !this.editingBusinessHours;
  }

  submitAddressChanges() {
    this.db.collection('Contact').ref.get().then((query) => {
      query.docs.forEach((doc) => {
        doc.ref.update({
          Address: this.newAddress
        });
      });
    });
    this.editingAddress = false;
  }

  submitPhoneChanges() {
    this.db.collection('Contact').ref.get().then((query) => {
      query.docs.forEach((doc) => {
        doc.ref.update({
          Phone: this.newPhone
        });
      });
    });
    this.editingPhone = false;
  }

  submitBusinessHoursChanges() {
    this.db.collection('Contact').ref.get().then((query) => {
      query.docs.forEach((doc) => {
        doc.ref.update({
          'Business Hours': this.newBusinessHours
        });
      });
    });
    this.editingBusinessHours = false;
  }
}
