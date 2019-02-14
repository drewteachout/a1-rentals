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

  public category: string;
  public isCategory: boolean;
  public columnDefs: any;
  public rowData: any;
  public images: (string | IImage)[];
  public productDescription: string;
  public productName: string;
  public total: string;

  private domLayout: string;
  private quoteTotal: number;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    this.columnDefs = [
      {
        headerName: 'Item Name',
        field: 'name'
      },
      {
        headerName: 'Price',
        field: 'price',
        sortable: true,
        type: 'numericColumn',
        valueFormatter: numberFormatter,
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        editable: true,
        type: 'numericColumn',
        valueParser: numberParser
      }
    ];

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
    this.loadData(route);
    this.isCategory = false;
   }

  ngOnInit() {
    this.productName = 'Chairs';
    this.quoteTotal = 0.00;
    this.total = '0.00';
  }

  loadData(route: ActivatedRoute) {
    route.paramMap.subscribe((urlParamMap: ParamMap) => {
      const name = urlParamMap.get('productName');
      const category = urlParamMap.get('productCategory');
      this.category = category;
      if (name == null || name.length === 0) {
        this.productName = category;
        this.isCategory = true;
      } else {
        this.productName = name;
        this.isCategory = false;
        this.db.collection('/' +
          category.replace('/', '-')).doc(name.replace('/', '-')).collection(name.replace('/', '-')).valueChanges().subscribe(items => {
          const newRowData = [];
          items.forEach(element => {
            newRowData.push({ name: element['type'], price: element['price'], quantity: 0 });
          });
          this.rowData = newRowData;
        });
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
