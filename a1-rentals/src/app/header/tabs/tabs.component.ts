import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/util/Product';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterViewInit {

  tab1: any[];
  tab2: any[];
  tab3: any[];
  tab4: any[];
  tabs: any[];
  previousTab: string = "Popular Products";

  constructor(private prodServ: ProductsService, private router: Router, private db: AngularFirestore) {
    this.tab1 = ['Popular Products', []];
    this.tab2 = ['Rental Products', []];
    
    this.db.collection('/products').doc('collection names').valueChanges().subscribe((productNames: string[]) => {
      let keyArray = []
      Object.keys(productNames).forEach(key => {
        keyArray.push(key);
      });
      keyArray = keyArray.sort()
      let productList = []
      keyArray.forEach(num => {
        productList.push(productNames[num])
      });
      console.log(productList);
      productList.forEach(productName => {
        let nextProductList = [productName, []];
        this.db.collection('/' + productName).valueChanges().subscribe((productInfo: any) => {
          for(let i = 0; i < productInfo.length; i++) {
            console.log(productInfo[i]);
            console.log(productInfo[i].hasOwnProperty('name'));
            if(productInfo[i].hasOwnProperty('name')) {
              nextProductList[1].push(productInfo[i]['name']);
            }
          }
          this.tab2[1].push(nextProductList);
        });
      });
    })
    this.tab3 = ['Packages', []];
    this.tab4 = ['Contact Us', []];
    this.tabs = [this.tab1, this.tab2, this.tab3, this.tab4];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let clickedButton = document.getElementById(this.previousTab);
    clickedButton.className = "button-tab accent";
  }

  // Calculates appropriate padding necessary based on where we are in the list
  setSubTabStyle(index, list) {
    const percentage = (100 / list.length * index).toString() + '%';
    const styles = {
      'top': percentage
    };
    return styles;
  }

  toggleButton(buttonName: string) {
    let previousButton = document.getElementById(this.previousTab);
    let clickedButton = document.getElementById(buttonName);
    previousButton.className = clickedButton.className;
    clickedButton.className = "button-tab accent";
    this.previousTab = buttonName;
  }

  subtabClicked(previous: string, name: string, event: MouseEvent) {
    event.stopPropagation();
    let prod = new Product(name, previous);
    this.prodServ.update(prod);
    this.router.navigateByUrl('/Rental Products');
  }
}
