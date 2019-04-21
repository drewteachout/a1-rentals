import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  public domLayout: string;
  public productData = [];

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {

    for (let i = 0; i < this.numColumns; i++) {
      this.productData.push([]);
    }

    this.images = [];
    this.productDescription = '';
    this.quoteTotal = 0.00;
    this.isProducts = false;
    this.handleData(route);
   }

  ngOnInit() {
    this.quoteTotal = 0.00;
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
        const myMap = new Map();
        const newColDefs = [];
        const newRowData = [];
        const newImageUrls = [];
        let hasSubCategories = false;
        products.forEach((product: any) => {
          const temp = [];
          let price = 0;
          Object.keys(product).forEach((key) => {
            if (key === 'array') {
              hasSubCategories = true;
            } else {
              myMap.set(key, product[key.toString()]);
              if (key !== 'db_name' && key !== 'description' && key !== 'image_urls'
                  && key !== 'price' && key !== 'rental fee') {
                // Pushes all the product data that needs to be displayed
                temp.push(product[key.toString()]);
              } else if (key === 'price' || key === 'rental fee') {
                // Sets the price
                price = product[key.toString()];
              } else if (key === 'image_urls') {
                product[key.toString()].forEach(imgUrl => {
                  newImageUrls.push({ url: imgUrl, caption: product['caption']});
                });
              }
            }
          });
          // Pushes the price information last
          if (price !== 0) {
            temp.push(price);
          }
          temp.push(0);
          newRowData.push(temp);
        });
        if (!hasSubCategories) {
          let priceLabel = 'Price';
          myMap.forEach((value, key) => {
            if (key !== 'db_name' && key !== 'description' && key !== 'image_urls'
                && key !== 'price' && key !== 'rental fee') {
              newColDefs.push(this.capitalize(key));
            } else if (key === 'price' || key === 'rental fee') {
              priceLabel = this.capitalize(key.toString());
            }
          });
          newColDefs.push(priceLabel);
          // newColDefs.push('Quantity');
          this.columnDefs = newColDefs;
          this.rowData = newRowData;
          this.images = newImageUrls;
          console.log('Row Data: ', this.rowData);
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
        const newRowData = [];
        const newImageUrls = [];
        products.forEach((product: any) => {
          const temp = [];
          let price = 0;
          Object.keys(product).forEach((key) => {
            myMap.set(key, product[key.toString()]);
            if (key !== 'db_name' && key !== 'description' && key !== 'image_urls'
                && key !== 'price' && key !== 'rental fee') {
              // Pushes all the product data that needs to be displayed
              temp.push(product[key.toString()]);
            } else if (key === 'price' || key === 'rental fee') {
              // Sets the price
              price = product[key.toString()];
            } else if (key === 'image_urls') {
              product[key.toString()].forEach(imgUrl => {
                newImageUrls.push({ url: imgUrl, caption: product['caption']});
              });
            }
          });
          // Pushes the price information last
          if (price !== 0) {
            temp.push(price);
          }
          temp.push(0);
          newRowData.push(temp);
        });
        let priceLabel = 'Price';
        myMap.forEach((value, key) => {
          if (key !== 'db_name' && key !== 'description' && key !== 'image_urls'
              && key !== 'price' && key !== 'rental fee') {
            newColDefs.push(this.capitalize(key));
          } else if (key === 'price' || key === 'rental fee') {
            priceLabel = this.capitalize(key.toString());
          }
        });
        newColDefs.push(priceLabel);
        this.columnDefs = newColDefs;
        this.rowData = newRowData;
        this.images = newImageUrls;
      });
  }

  loadAllRentalProducts() {
    this.isProducts = true;
    this.db.collection('/products').valueChanges()
      .subscribe((products: any[]) => {
        this.productData = [];
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
        this.productData = [];
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

  addSelectionToCart() {
    // TODO: Push table data to database
  }

  updatePriceEstimate() {
    this.quoteTotal = 0;
    this.rowData.forEach(product => {
      this.quoteTotal += +product[product.length - 2] * product[product.length - 1];
    });
  }

  capitalize(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
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
