import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { QuoteCartServiceService } from '../services/quote-cart-service.service';
import { CartItem } from '../util/CartItem';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public numColumns = 5;
  
  public colSize = Math.floor(Number(12/this.numColumns));

  public quoteTotal: number;
  public category: string;
  public isProducts: boolean;
  public columnDefs: any;
  public rowData: any;
  public images: (string | IImage)[];
  public productDescription: string;
  public productName: string;
  public domLayout: string;
  public productData = [];

  cartService: QuoteCartServiceService;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, cartService: QuoteCartServiceService) {
    this.cartService = cartService;

    this.images = [];
    this.productDescription = '';
    this.quoteTotal = 0;
    this.isProducts = false;
    this.handleData(route);
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
      if (category === '' && name == null) {
        this.isProducts = true;
        this.loadAllRentalProducts();
      } else if (name == null || name.length === 0) {
        this.isProducts = false;
        this.productName = category;
        this.db.collection('products').doc(category).valueChanges()
            .subscribe(product => {
              this.productDescription = product['description'];
        });
        this.loadDataCategory(category);
      } else {
        this.isProducts = false;
        this.productName = name;
        this.db.collection('/' + category.replace('/', '-'))
            .doc(name.replace('/', '-')).valueChanges()
            .subscribe(product => {
              this.productDescription = product['description'];
        });
        this.loadDataSubCategory(category, name);
      }
    });
  }

  loadDataCategory(category) {
    this.db.collection('/' + category.replace('/', '-')).valueChanges()
      .subscribe((products: any[]) => {
        let myMap = new Map();
        const newColDefs = [];
        const newRowData = [];
        const newImageUrls = [];
        let hasSubCategories = false;
        products.forEach((product: any) => {
          myMap = new Map();
          Object.keys(product).forEach((key) => {
            if (key === 'array') {
              hasSubCategories = true;
            } else {
              myMap.set(key, product[key.toString()]);
              if (key === 'image_urls') {
                product[key.toString()].forEach(imgUrl => {
                  newImageUrls.push({ url: imgUrl, caption: product['caption']});
                });
              }
            }
          });
          newRowData.push(myMap);
        });
        if (!hasSubCategories) {
          let priceLabel = 'price';
          myMap.forEach((value, key) => {
            if (key !== 'db_name' && key !== 'description' && key !== 'image_urls'
                && key !== 'price' && key !== 'rental fee' && key !== 'name') {
              newColDefs.push(key);
            } else if (key === 'price') {
              priceLabel = key.toString();
            }
          });
          newColDefs.push(priceLabel);
          newColDefs.push('quantity');
          newRowData.forEach(row => {
            row.set('quantity', 0);
          });
          this.columnDefs = newColDefs;
          this.rowData = newRowData;
          this.images = newImageUrls;
          console.log(this.images);
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
        let myMap = new Map();
        const newColDefs = [];
        const newRowData = [];
        const newImageUrls = [];
        products.forEach((product: any) => {
          myMap = new Map();
          Object.keys(product).forEach((key) => {
            myMap.set(key, product[key.toString()]);
            if (key === 'image_urls') {
              product[key.toString()].forEach(imgUrl => {
                newImageUrls.push({ url: imgUrl, caption: product['caption']});
              });
            }
          });
          newRowData.push(myMap);
        });
        let priceLabel = 'price';
        myMap.forEach((value, key) => {
          if (key !== 'db_name' && key !== 'description' && key !== 'image_urls'
              && key !== 'price' && key !== 'rental fee' && key !== 'name') {
            newColDefs.push(key);
          } else if (key === 'price' || key === 'rental fee') {
            priceLabel = key.toString();
          }
        });
        newColDefs.push(priceLabel);
        newColDefs.push('quantity');
        newRowData.forEach(row => {
          row.set('quantity', 0);
        });
        this.columnDefs = newColDefs;
        this.rowData = newRowData;
        this.images = newImageUrls;
        console.log(this.images);
      });
  }

  loadAllRentalProducts() {
    this.isProducts = true;
    this.db.collection('/products').valueChanges()
      .subscribe((products: any[]) => {
        this.productData = [];
        const orderedProducts = products.sort((a: any, b: any) => a.display_order - b.display_order);
        for (let i = 0; i < orderedProducts.length; i++) {
          const key = Math.floor(Number(i / this.numColumns));
          let data = this.productData[key];
          if (data === undefined) {
            this.productData.push([]);
            data = this.productData[key];
          }
          data.push([orderedProducts[i].display_name, orderedProducts[i].image_url, orderedProducts[i].collection_name]);
          this.productData[key] = data;
        }
      });
  }

  loadRentalProducts(category) {
    this.isProducts = true;
    this.db.collection('/' + category.replace('/', '-')).valueChanges()
      .subscribe((products: any[]) => {
        this.productData = [];
        const orderedProducts = products.sort((a: any, b: any) => a.display_order - b.display_order);
        for (let i = 0; i < orderedProducts.length; i++) {
          const key = Math.floor(Number(i / this.numColumns));
          let data = this.productData[key];
          if (data === undefined) {
            this.productData.push([]);
            data = this.productData[key];
          }
          data.push([products[i].display_name, products[i].image_url, category + '/' + products[i].db_name]);
          this.productData[key] = data;
        }
      });
  }

  addSelectionToCart() {
    const selection = [];
    this.rowData.forEach(product => {
      if (product.get('quantity') > 0) {
        selection.push(new CartItem(product.get('name'), product.get('description'),
                                    product.get('quantity'), product.get('price')));
        product.set('quantity', 0);
      }
    });
    this.quoteTotal = 0;
    this.cartService.addToCart(selection);
  }

  updatePriceEstimate(event, row) {
    row.set('quantity', event);
    this.quoteTotal = 0;
    this.rowData.forEach(product => {
      this.quoteTotal += +product.get('price') * product.get('quantity');
    });
  }
}
