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
  category: string;
  isCategory: boolean;
  productDescription = 'Our sturdy poly/metal chair rentals feature vinyl seats and back with a metal frame.' +
    'The resin padded chair rentals are designed to be more comfortable and they look great for that traditional' +
    ' wedding look. Both styles resist sinking into lawns. A-1 Rentals also have chair rentals designed for ' +
    'the little ones. They can be used with our children\'s tables. They are good for children up to ' +
    'approximately 6 or 7 years old. The solid resin chairs are red or blue. The metal framed children\'s chair' +
    ' rentals feature a blue vinyl seat.';

  public columnDefs;
  public rowData;
  public quoteTotal: number;

  domLayout = 'autoHeight';

  private gridApi;
  private gridColumnApi;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    this.columnDefs = [
      {
        headerName: 'Item Name',
        field: 'name'
      },
      {
        headerName: 'Price ($)',
        field: 'price',
        sortable: true,
        type: 'numericColumn',
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        editable: true,
        type: 'numericColumn',
        valueFormatter: numberFormatter,
        valueParser: numberParser
      }
    ];

    this.rowData = [
      { name: 'Poly/metal chair rental - black', price: 1.25, quantity: 0},
      { name: 'Poly/metal chair rental - WEDDING white', price: 1.75, quantity: 0},
      { name: 'Resin padded chair rental - white', price: 3.25, quantity: 0},
      { name: 'Children\'s chair rental', price: 1.50, quantity: 0},
      { name: 'L.E.D. Bar stool', price: 25.00, quantity: 0},
      { name: 'L.E.D. Beanbag chair', price: 29.00, quantity: 0},
      { name: 'L.E.D. Bench', price: 39.00, quantity: 0},
      { name: 'L.E.D. Curved Bench', price: 39.00, quantity: 0},
      { name: 'L.E.D. Cube, 16" x 16"', price: 19.00, quantity: 0},
      { name: 'L.E.D. Furniture', price: 'See L.E.D. Furniture Page', quantity: 0},
    ];

    // this.prodServ.get().subscribe((product: Product) => {
    //   this.productName = product.productName;
    // });

    this.productName = 'Chairs';
    this.isCategory = false;
    route.paramMap.subscribe((urlParamMap: ParamMap) => {
      console.log('ProductName: ', urlParamMap.get('productName'));
      console.log('ProductCategory: ', urlParamMap.get('productCategory'));
      const name = urlParamMap.get('productName');
      const category = urlParamMap.get('productCategory');
      this.category = category;
      if (name == null || name.length === 0) {
        this.productName = category;
        this.isCategory = true;
      } else {
        this.productName = name;
        this.isCategory = false;
        this.db.collection('/' + category).doc(name).collection(name).valueChanges().subscribe(items => {
          console.log(items);
          const newRowData = [];
          items.forEach(element => {
            newRowData.push({ name: element['type'], price: element['price'], quantity: 0 });
          });
          this.rowData = newRowData;
        });
      }
    });
   }

  ngOnInit() {
    this.productName = 'Chairs';
    this.quoteTotal = 0.00;
    this.loadData();
  }

  loadData() {

  }

  onCellValueChanged(event) {
    if (!isNaN(event.newValue)) {
      const price = event.data.price;
      const oldItemTotal = event.oldValue * price;
      const newItemTotal = event.newValue * price;
      if (!isNaN(newItemTotal)) {
        this.quoteTotal = this.quoteTotal - oldItemTotal + newItemTotal;
      }
    }
  }

  addSelectionToCart() {
    // TODO: Push table data to database
  }

  handleNode(node, index) {
    // console.log('Index: ', index);
    // console.log('Node: ', node);
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSizeAll() {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // this.http
    //   .get(
    //     "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    //   )
    //   .subscribe(data => {
    //     this.rowData = data;
    //   });
  }

}

function numberFormatter(params) {
  return formatNumber(params.value);
}
function numberParser(params) {
  return Number(params.newValue);
}
function formatNumber(number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
