import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  images: (string | IImage)[] = [
    { url: 'assets/images/blackChair.jpg', caption: 'Poly/metal chair rental - black'},
    { url: 'assets/images/whiteChair.jpg', caption: 'Poly/metal chair rental - WEDDING white'},
    { url: 'assets/images/resinChair.jpg', caption: 'Resin padded chair rental - white'},
    { url: 'assets/images/ledBarStool.jpg', caption: 'L.E.D. Bar stool'},
    { url: 'assets/images/ledBeanBagChair.jpg', caption: 'L.E.D. Beanbag chair'},
    { url: 'assets/images/ledBench.jpg', caption: 'L.E.D. Bench'},
    { url: 'assets/images/ledCube1.png', caption: 'L.E.D. Cube, 16" x 16"'},
    { url: 'assets/images/ledCube2.jpg', caption: 'L.E.D. Cube, 20" x 20"'},
  ];

  productName: string;
  productDescription = 'Our sturdy poly/metal chair rentals feature vinyl seats and back with a metal frame.' +
    'The resin padded chair rentals are designed to be more comfortable and they look great for that traditional' +
    ' wedding look. Both styles resist sinking into lawns. A-1 Rentals also have chair rentals designed for ' +
    'the little ones. They can be used with our children\'s tables. They are good for children up to ' +
    'approximately 6 or 7 years old. The solid resin chairs are red or blue. The metal framed children\'s chair' +
    ' rentals feature a blue vinyl seat.';
  quoteTotal: string;

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
   }

  ngOnInit() {
    this.productName = 'Chairs';
    this.quoteTotal = '0.00';
    this.loadData();
  }

  loadData() {

  }

}
