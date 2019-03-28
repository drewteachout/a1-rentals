import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/util/Product';
import { ProductsService } from 'src/app/services/products.service';
import { Router} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { filter, map } from 'rxjs/operators';

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
    this.db.collection('/products').valueChanges().subscribe((productGroups: any[]) => {
      this.tab2[1] = new Array(productGroups.length);
      productGroups.forEach(product => {
        if (!product['hidden']) {
          this.db.collection(product['collection_name']).valueChanges().pipe(map((productSubgroups) => {
            console.log(productSubgroups);
            return productSubgroups.filter((element: any) => element.hasOwnProperty('array') && element.array && !element.hidden);
          })).subscribe((productSubgroups: any) => {
            const nextProductList: any[] = [product['display_name'], []];
            for (let i = 0; i < productSubgroups.length; i++) {
              nextProductList[1].push(productSubgroups[i]['name']);
            }
            let flag = false;
            for (let i = 0; i < this.tab2[1].length; i++) {
              if (this.tab2[1][i] !== undefined && this.tab2[1][i][0] === nextProductList[0]) {
                this.tab2[1][i] = nextProductList;
                flag = true;
              }
            }
            if (!flag) {
              this.tab2[1][product.display_order - 1] = nextProductList;
            }
            this.tab2[1] = this.tab2[1].filter((element: any) => {
              return element !== undefined;
            });
            console.log(this.tab2[1]);
          });
        }
      });
    });
    this.tab3 = ['Packages', []];
    this.tab4 = ['Contact Us', []];
    this.tab5 = ['References', []];
    this.tabs = [this.tab1, this.tab2, this.tab3, this.tab4, this.tab5];
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
    const prod = new Product(name, previous);
    this.prodServ.update(prod);
    this.router.navigate(['/Rental Products', previous, name]);
  }
}
