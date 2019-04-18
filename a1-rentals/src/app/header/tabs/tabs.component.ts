import { Component, OnInit} from '@angular/core';
import { Product } from 'src/app/util/Product';
import { ProductsService } from 'src/app/services/products.service';
import { Router} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, filter, flatMap} from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

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
    this.db.collection('/products').valueChanges().pipe(map((docs: any[]) => {
      const subgroups = Array<Observable<any[]>>(docs.length);
      this.tab2[1] = Array(docs.length);
      docs.forEach((doc) => {
        this.tab2[1][doc.display_order - 1] = [doc, []];
        subgroups[doc.display_order - 1] = this.db.collection(doc.collection_name).valueChanges();
      });
      return subgroups;
    }), flatMap(res =>  {
      return combineLatest(res)
    }))
    .subscribe((subgroups) => {
      for (let i = 0; i < subgroups.length; i++) {
        if (subgroups[i].length > 0 && subgroups[i][0].hasOwnProperty('array')) {
          this.tab2[1][i][1] = subgroups[i];
        }
      }
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
