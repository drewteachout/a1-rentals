import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productName: string;

  columnDefs = [
    {headerName: 'Item Name', field: 'name', width: 438},
    {headerName: 'Price ($)', field: 'price', width: 170, sortable: true},
    {headerName: 'Quantity', field: 'quantity', editable: true, width: 90}
  ];

  rowData = [
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'},
    { name: 'Poly/metal chair rental - WEDDING white', price: '1.75', quantity: '0'},
    { name: 'Resin padded chair rental - white', price: '3.25', quantity: '0'},
    { name: 'Children\'s chair rental', price: '1.50', quantity: '0'},
    { name: 'L.E.D. Bar stool', price: '25', quantity: '0'},
    { name: 'L.E.D. Beanbag chair', price: '29', quantity: '0'},
    { name: 'L.E.D. Bench', price: '39', quantity: '0'},
    { name: 'L.E.D. Curved Bench', price: '39', quantity: '0'},
    { name: 'L.E.D. Cube, 16" x 16"', price: '19', quantity: '0'},
    { name: 'L.E.D. Furniture', price: 'See L.E.D. Furniture Page', quantity: '0'},
  ];

  constructor() {
    this.productName = "Chairs"
   }

  ngOnInit() {
    // this.rowData = this.http.get('url');
  }

}
