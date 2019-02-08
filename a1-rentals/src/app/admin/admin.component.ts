import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  columnDefs = [
    {headerName: 'Product name', field: 'name', width: 438},
    {headerName: 'Hidden from dropdown', field: 'hidden', width: 170, sortable: true},
    {headerName: 'Number', field: 'orderNum', width: 170, sortable: true}
  ];

  products: any[] = []
  // rowData = [
  //   { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'},
  //   { name: 'Poly/metal chair rental - WEDDING white', price: '1.75', quantity: '0'},
  //   { name: 'Resin padded chair rental - white', price: '3.25', quantity: '0'},
  //   { name: 'Children\'s chair rental', price: '1.50', quantity: '0'},
  //   { name: 'L.E.D. Bar stool', price: '25', quantity: '0'},
  //   { name: 'L.E.D. Beanbag chair', price: '29', quantity: '0'},
  //   { name: 'L.E.D. Bench', price: '39', quantity: '0'},
  //   { name: 'L.E.D. Curved Bench', price: '39', quantity: '0'},
  //   { name: 'L.E.D. Cube, 16" x 16"', price: '19', quantity: '0'},
  //   { name: 'L.E.D. Furniture', price: 'See L.E.D. Furniture Page', quantity: '0'},
  // ];
  constructor(private db: AngularFirestore) {
    this.db.collection('/products').valueChanges().subscribe((productNames: any[]) => {
      console.log(productNames);
      productNames.forEach(element => {
        this.products.push({
          name: element['display_name'],
          hidden: element['hidden'],
          orderNum: element['display_order']});
      });
    });
  }

  ngOnInit() {
  }

}
