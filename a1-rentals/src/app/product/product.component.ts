import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  columnDefs = [
    {headerName: 'Item Name', field: 'name' },
    {headerName: 'Price ($)', field: 'price' },
    {headerName: 'Quantity', field: 'quantity'}
  ];

  rowData = [
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'},
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'},
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'}
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'}
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'}
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'}
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'}
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'}
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'}
    { name: 'Poly/metal chair rental - black', price: '1.25', quantity: '0'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
