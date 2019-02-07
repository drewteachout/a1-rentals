import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  imageObject: Array<object> = [
    { image: 'assets/images/blackChair.jpg', thumbImage: 'assets/images/blackChair.jpg', title: 'Poly/metal chair rental - black'},
    { image: 'assets/images/whiteChair.jpg', thumbImage: 'assets/images/whiteChair.jpg'},
    { image: 'assets/images/resinChair.jpg', thumbImage: 'assets/images/resinChair.jpg'},
    { image: 'assets/images/ledBarStool.jpg', thumbImage: 'assets/images/ledBarStool.jpg'},
    { image: 'assets/images/ledBeanBagChair.jpg', thumbImage: 'assets/images/ledBeanBagChair.jpg'},
    { image: 'assets/images/ledBench.jpg', thumbImage: 'assets/images/ledBench.jpg'},
    { image: 'assets/images/ledCube1.png', thumbImage: 'assets/images/ledCube1.png'},
    { image: 'assets/images/ledCube2.jpg', thumbImage: 'assets/images/ledCube2.jpg'},
  ];

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
  // images: Map<string, string>;

  productName: string;
  productDescription = 'Our sturdy poly/metal chair rentals feature vinyl seats and back with a metal frame.' +
    'The resin padded chair rentals are designed to be more comfortable and they look great for that traditional' +
    ' wedding look. Both styles resist sinking into lawns. A-1 Rentals also have chair rentals designed for ' +
    'the little ones. They can be used with our children\'s tables. They are good for children up to ' +
    'approximately 6 or 7 years old. The solid resin chairs are red or blue. The metal framed children\'s chair' +
    ' rentals feature a blue vinyl seat.';
  quoteTotal: string;
  urls: string[] = [
    'assets/images/blackChair.jpg',
    'assets/images/whiteChair.jpg',
    'assets/images/resinChair.jpg',
    'assets/images/ledBarStool.jpg',
    'assets/images/ledBeanBagChair.jpg'
  ];
  titles: string[] = [
    'Poly/metal chair rental - black',
    'Poly/metal chair rental - WEDDING white',
    'Resin padded chair rental - white',
    // 'L.E.D. Bar stool',
    // 'L.E.D. Beanbag chair'
  ];

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
    this.productName = 'Chairs';
    this.quoteTotal = '0.00';
    // this.images = [];
    this.titles = [];
    this.urls = [];
    this.loadData();
    // this.images = new Map<string, string>();
   }

  ngOnInit() {
    // this.rowData = this.http.get('url');
    // this.images['assets/images/blackChair.jpg'] = 'Poly/metal chair rental - black';
    // this.images['assets/images/whiteChair.jpg'] = 'Poly/metal chair rental - WEDDING white';
    // this.images['assets/images/resinChair.jpg'] = 'Resin padded chair rental - white';
    // this.images['assets/images/ledBarStool.jpg'] = 'L.E.D. Bar stool';
    // this.images['assets/images/ledBeanBagChair.jpg'] = 'L.E.D. Beanbag chair';
    // this.images['assets/images/ledBench.jpg'] = 'L.E.D. Bench';
    // this.images['assets/images/ledCube1.png'] = 'L.E.D. Cube, 16" x 16"';
    // this.images['assets/images/ledCube2.jpg'] = 'L.E.D. Cube, 20" x 20"';
  }

  loadData() {
    // console.log(this.images[0].title);
    // for (let i = 0; i < this.images.length; i++) {
    //   this.urls.push(this.images[i].url);
    //   this.titles.push(this.images[i].title);
    //   console.log('looping');
    // }
    // console.log(this.titles);
    // console.log(this.urls);
  }

}
