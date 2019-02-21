import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/util/Product';
import { ProductsService } from 'src/app/services/products.service';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  tab1: any[];
  tab2: any[];
  tab3: any[];
  tab4: any[];
  tab5: any[];
  tabs: any[];

  constructor(private prodServ: ProductsService, private router: Router, private db: AngularFirestore) {
    this.tab1 = ['Popular Products', []];
    this.tab2 = ['Rental Products', []];
    this.db.collection('/products').valueChanges().subscribe((productNames: any[]) => {
      this.tab2[1] = [];
      productNames.forEach(product => {
        if (!product['hidden']) {
          this.db.collection('/' + product['collection_name']).valueChanges().subscribe((productInfo: any) => {
            const nextProductList: any[] = [product['display_name'], []]
            for (let i = 0; i < productInfo.length; i++) {
              if (productInfo[i].hasOwnProperty('name')) {
                if (!productInfo[i]['hidden']) {
                  nextProductList[1].push(productInfo[i]['name']);
                }
              }
            }
            let flag = false;
            for (let i = 0; i < this.tab2[1].length; i++) {
              if(this.tab2[1][i][0] === nextProductList[0]) {
                this.tab2[1][i] = nextProductList;
                flag = true;
              }
            }
            if (!flag) {
              this.tab2[1].push(nextProductList);
            }
          });
        }
      });
    });
    this.tab3 = ['Packages', []];
    this.tab4 = ['Contact Us', []];
    this.tabs = [this.tab1, this.tab2, this.tab3, this.tab4];
  }

  ngOnInit() {
  }

  // Calculates appropriate padding necessary based on where we are in the list
  setSubTabStyle(index, list) {
    const percentage = (100 / list.length * index).toString() + '%';
    const styles = {
      'top': percentage
    };
    return styles;
  }

  subtabClicked(previous: string, name: string, event: MouseEvent) {
    event.stopPropagation();
    let prod = new Product(name, previous);
    this.prodServ.update(prod);
    this.router.navigate(['/Rental Products', previous, name]);
  }
}
