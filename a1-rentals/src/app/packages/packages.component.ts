import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers: [AngularFirestore]
})
export class PackagesComponent implements OnInit {

  private numColumns = 3;

  packageData = [];

  constructor(private db: AngularFirestore) {
    for (let i = 0; i < this.numColumns; i++) {
      this.packageData.push([]);
    }
    this.loadData();
   }

  ngOnInit() {
  }

  loadData() {
    this.db.collection('packages').valueChanges().subscribe((packages: any[]) => {
      const packageMap = new Map();
      packages.forEach(pck => {
        packageMap.set(pck['display_order'], pck);
      });
      for (let i = 0; i < packages.length; i++) {
        const key = i % this.numColumns;
        const data = this.packageData[key];
        const imageUrls = [];
        packageMap.get(String(i + 1)).image_urls.forEach(imgUrl => {
          imageUrls.push({ url: imgUrl });
        });
        data.push([packageMap.get(String(i + 1)).name, imageUrls, packageMap.get(String(i + 1)).description,
          packageMap.get(String(i + 1)).price, packageMap.get(String(i + 1)).items]);
        this.packageData[key] = data;
      }
    });
  }
}
