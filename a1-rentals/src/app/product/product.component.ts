import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../util/Product';
import { AngularFirestore } from 'angularfire2/firestore';

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

  productName: string;
  category: string;
  isCategory: boolean;
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

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {

    this.productName = 'Chairs';
    this.quoteTotal = '0.00';
    this.isCategory = false
    route.paramMap.subscribe((urlParamMap: ParamMap) => {
      console.log(urlParamMap.get('productName'))
      console.log(urlParamMap.get('productCategory'))
      let name = urlParamMap.get('productName')
      let category = urlParamMap.get('productCategory')
      this.category = category
      if(name == null || name.length == 0) {
        this.productName = category
        this.isCategory = true
      } else {
        this.productName = name
        this.isCategory = false
        this.db.collection("/" + category).doc(name).collection(name).valueChanges().subscribe(items => {
          console.log(items)
          let newRowData = []
          items.forEach(element => {
            newRowData.push({ name: element['type'], price: element['price'], quantity: 0 })
          });
          this.rowData = newRowData
        })
      }
    })
   }

  ngOnInit() {
    
    // this.rowData = this.http.get('url');
  }

}
