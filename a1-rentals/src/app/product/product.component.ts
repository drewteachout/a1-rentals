import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
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

  private numColumns = 5;
  private quoteTotal: number;

  public category: string;
  public isProducts: boolean;
  public columnDefs: any;
  public rowData: any;
  public images: (string | IImage)[];
  public productDescription: string;
  public productName: string;
  public total: string;
  public domLayout: string;

  productData = [];

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {

    for (let i = 0; i < this.numColumns; i++) {
      this.productData.push([]);
    }

    this.images = [
      { url: 'assets/images/blackChair.jpg', caption: 'Poly/metal chair rental - black'},
      { url: 'assets/images/whiteChair.jpg', caption: 'Poly/metal chair rental - WEDDING white'},
      { url: 'assets/images/resinChair.jpg', caption: 'Resin padded chair rental - white'},
      { url: 'assets/images/ledBarStool.jpg', caption: 'L.E.D. Bar stool'},
      { url: 'assets/images/ledBeanBagChair.jpg', caption: 'L.E.D. Beanbag chair'},
      { url: 'assets/images/ledBench.jpg', caption: 'L.E.D. Bench'},
      { url: 'assets/images/ledCube1.png', caption: 'L.E.D. Cube, 16" x 16"'},
      { url: 'assets/images/ledCube2.jpg', caption: 'L.E.D. Cube, 20" x 20"'},
    ];

    this.productDescription = 'Our sturdy poly/metal chair rentals feature vinyl seats and back with a metal frame.' +
    'The resin padded chair rentals are designed to be more comfortable and they look great for that traditional' +
    ' wedding look. Both styles resist sinking into lawns. A-1 Rentals also have chair rentals designed for ' +
    'the little ones. They can be used with our children\'s tables. They are good for children up to ' +
    'approximately 6 or 7 years old. The solid resin chairs are red or blue. The metal framed children\'s chair' +
    ' rentals feature a blue vinyl seat.';

    this.domLayout = 'autoHeight';
    this.isProducts = false;
    this.handleData(route);
    this.quoteTotal = 0.00;
    this.total = '0.00';
   }

  ngOnInit() {
  }

  handleData(route: ActivatedRoute) {
    this.rowData = [];
    this.productData = [];
    for (let i = 0; i < this.numColumns; i++) {
      this.productData.push([]);
    }
    route.paramMap.subscribe((urlParamMap: ParamMap) => {
      const name = urlParamMap.get('productName');
      const category = urlParamMap.get('productCategory');
      this.category = category;
      console.log(urlParamMap);
      console.log('Category: ', category);
      console.log('Name: ', name);

      if (category === '' && name == null) {
        this.isProducts = true;
        this.loadAllRentalProducts();
      } else if (name == null || name.length === 0) {
        this.isProducts = false;
        this.productName = category;
        this.loadDataCategory(category);
      } else {
        this.isProducts = false;
        this.productName = name;
        this.loadDataSubCategory(category, name);
      }
    });
  }

  loadDataCategory(category) {
    this.db.collection('/' + category.replace('/', '-')).valueChanges()
      .subscribe((products: any[]) => {
        const myMap = new Map();
        const newColDefs = [];
        let hasSubCategories = false;
        console.log('Products', products);
        products.forEach((product: any) => {
          Object.keys(product).forEach((key) => {
            console.log(key === 'array');
            if (key === 'array') {
              hasSubCategories = true;
            } else {
              myMap.set(key, product[key.toString()]);
            }
          });
        });
        if (!hasSubCategories) {
          myMap.forEach((value, key) => {
            if (isNaN(value)) {
              newColDefs.push({
                field: key,
                headerName: key.toString().charAt(0).toUpperCase() + key.toString().substr(1)
              });
            } else {
              newColDefs.push({
                field: key,
                headerName: key.toString().charAt(0).toUpperCase() + key.toString().substr(1),
                sortable: true,
                type: 'numericColumn',
                valueFormatter: numberFormatter,
              });
            }
          });
          newColDefs.push({
            headerName: 'Quantity',
            field: 'quantity',
            editable: true,
            type: 'numericColumn',
            valueParser: numberParser
          });
          this.rowData = products;
          this.columnDefs = newColDefs;
        } else {
          this.loadRentalProducts(category);
        }
      });
  }

  loadDataSubCategory(category, name) {
    this.db.collection('/' + category.replace('/', '-'))
      .doc(name.replace('/', '-'))
      .collection(name.replace('/', '-')).valueChanges()
      .subscribe((products: any[]) => {
        const myMap = new Map();
        const newColDefs = [];
        products.forEach((product: any) => {
          Object.keys(product).forEach((key) => {
            myMap.set(key, product[key.toString()]);
          });
        });
        myMap.forEach((value, key) => {
          if (isNaN(value)) {
            newColDefs.push({
              field: key,
              headerName: key.toString().charAt(0).toUpperCase() + key.toString().substr(1)
            });
          } else {
            newColDefs.push({
              field: key,
              headerName: key.toString().charAt(0).toUpperCase() + key.toString().substr(1),
              sortable: true,
              type: 'numericColumn',
              valueFormatter: numberFormatter,
            });
          }
        });
        newColDefs.push({
          headerName: 'Quantity',
          field: 'quantity',
          editable: true,
          type: 'numericColumn',
          valueParser: numberParser
        });
        this.rowData = products;
        this.columnDefs = newColDefs;
      });
  }

  loadAllRentalProducts() {
    this.isProducts = true;
    this.db.collection('/products').valueChanges()
      .subscribe((products: any[]) => {
        this.productData = []
        for (let i = 0; i < this.numColumns; i++) {
          this.productData.push([]);
        }
        for (let i = 0; i < products.length; i++) {
          const key = i % this.numColumns;
          const data = this.productData[key];
          data.push([products[i].display_name, products[i].image_url, products[i].collection_name]);
          this.productData[key] = data;
        }
      });
  }

  loadRentalProducts(category) {
    this.isProducts = true;
    this.db.collection('/' + category.replace('/', '-')).valueChanges()
      .subscribe((products: any[]) => {
        this.productData = []
        for (let i = 0; i < this.numColumns; i++) {
          this.productData.push([]);
        }
        for (let i = 0; i < products.length; i++) {
          const key = i % this.numColumns;
          const data = this.productData[key];
          data.push([products[i].display_name, products[i].image_url, category + '/' + products[i].db_name]);
          this.productData[key] = data;
        }
      });
  }

  onCellValueChanged(event) {
    if (!isNaN(event.newValue)) {
      const price = event.data.price;
      const oldItemTotal = event.oldValue * price;
      const newItemTotal = event.newValue * price;
      if (!isNaN(newItemTotal)) {
        if (!isNaN(oldItemTotal)) {
          this.quoteTotal = this.quoteTotal - oldItemTotal;
        }
        this.quoteTotal = this.quoteTotal + newItemTotal;
      }
    }
    this.total = this.currencyConverter(this.quoteTotal);
  }

  addSelectionToCart() {
    // TODO: Push table data to database
  }

  currencyConverter(value: number): string {
    let val = value.toString();
    const index = val.indexOf('.');
    const len = val.length;
    if (index >= 0 && index === len - 1) {
      val = val + '0';
    } else if (index === -1) {
      val = val + '.00';
    }
    return val;
  }
}

function numberFormatter(params) {
  return formatNumber(params.value);
}
function numberParser(params) {
  return Number(params.newValue);
}
function formatNumber(number) {
  return '$' + Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
