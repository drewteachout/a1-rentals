import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-picture-manager',
  templateUrl: './picture-manager.component.html',
  styleUrls: ['./picture-manager.component.css']
})
export class PictureManagerComponent implements OnInit {
  currentGroupSelection: any;
  currentSubgroupSelection: any;
  columnDefs = [];
  products: any[] = [];
  subgroups: any[] = [];
  rowData: any[] = [];
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    this.db.collection('/products').valueChanges().subscribe((productGroups: any[]) => {
      const temp = new Array(productGroups.length);
      productGroups.forEach(element => {
        temp[element['display_order'] - 1] = {
          name: element['display_name'],
          db_name: element['collection_name'],
          hidden: element['hidden'],
          orderNum: element['display_order']};
        if (element.hasOwnProperty('image_url')) {
          temp[element.display_order - 1]['image_url'] = element.image_url;
        } else {
          temp[element.display_order - 1]['image_url'] = '';
        }
        });
      this.products = temp;
      if (this.currentGroupSelection === undefined) {
        this.currentGroupSelection = this.products.length === 0 ? {name: ''} : this.products[0];
      }
    });
  }

  ngOnInit() {
  }

  groupValueChanged(newGroup: any) {
    this.currentGroupSelection = newGroup;
    this.currentSubgroupSelection = null;
    this.db.collection('/' + this.currentGroupSelection.db_name).valueChanges().pipe(map(productSubgroups => {
      return productSubgroups.filter((element: any) => element.hasOwnProperty('array') && element.array);
    })).subscribe((subgroups) => {
      if (this.currentSubgroupSelection == null) {
        this.subgroups = subgroups;
        if (this.subgroups.length !== 0) {
          this.currentSubgroupSelection = this.subgroups[0];
          this.subgroupValueChanged(this.subgroups[0]);
        }
      } else { // same as the if block for now until I investigate whether this causes problems
        this.subgroups = subgroups;
        if (this.subgroups.length !== 0) {
          this.currentSubgroupSelection = this.subgroups[0];
          this.subgroupValueChanged(this.subgroups[0]);
        }
      }
    });
    this.db.collection('/' + this.currentGroupSelection.db_name).valueChanges().pipe(map(productSubgroups => {
      return productSubgroups.filter(element => !element.hasOwnProperty('array'));
    })).subscribe((products: []) => {
      if (products !== undefined && products.length > 0) {
        const mySet = new Set();
        products.forEach((product: any) => {
          Object.keys(product).forEach((key) => {
            mySet.add(key);
          });
        });
        const newColDefs = [];
        mySet.forEach((key) => {
          if (key !== 'db_name' && key !== 'image_urls') {
            newColDefs.push({
              field: key
            });
          }
        });
        this.columnDefs = newColDefs;
      }
      if (this.currentSubgroupSelection == null) {
        this.rowData = products;
      }
    });
  }

  subgroupValueChanged(subgroup: any) {
    this.currentSubgroupSelection = subgroup;
    this.db.collection('/' + this.currentGroupSelection.db_name)
    .doc(this.currentSubgroupSelection.db_name)
    .collection(this.currentSubgroupSelection.db_name).valueChanges()
    .subscribe((products: any[]) => {
      if (products !== undefined && products.length > 0) {
        const mySet = new Set();
        products.forEach((product: any) => {
          Object.keys(product).forEach((key) => {
            mySet.add(key);
          });
        });
        const newColDefs = [];
        mySet.forEach((key) => {
          if (key !== 'db_name' && key !== 'image_urls') {
            newColDefs.push({
              field: key
            });
          }
        });
        this.columnDefs = newColDefs;
      }
      this.rowData = products;
    });
  }
}
