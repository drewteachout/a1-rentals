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
      console.log(packages)
      for (let i = 0; i < packages.length; i++) {
        const key = i % this.numColumns;
        const data = this.packageData[key];
        data.push([packages[i].name, packages[i].path, packages[i].description, packages[i].price]);
        this.packageData[key] = data;
      }
      console.log(this.packageData);
    });
  }
}
