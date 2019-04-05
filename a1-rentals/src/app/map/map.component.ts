import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'Our Location';
  lat = 33.938514;
  lng = -84.539387;

  latCenter = 33.953;
  lngCenter = -84.550;

  address = '';
  businessHours = '';
  phone = '';

  constructor(private db: AngularFirestore) {
    this.db.collection('Contact').valueChanges().subscribe((docs: any) => {
      const doc = docs[0];
      this.address = doc.Address;
      this.businessHours = doc['Business Hours'];
      this.phone = doc.Phone;
    })
  }

  ngOnInit() {
  }

}
