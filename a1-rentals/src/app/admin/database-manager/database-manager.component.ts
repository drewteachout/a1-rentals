import { Component, OnInit } from '@angular/core';
import { AngularFirestore, CollectionReference } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-database-manager',
  templateUrl: './database-manager.component.html',
  styleUrls: ['./database-manager.component.css']
})
export class DatabaseManagerComponent implements OnInit {

  currentGroupSelection: any;
  currentSubgroupSelection: any;
  columnDefs = [];
  products: any[] = [];
  subgroups: any[] = [];
  rowData: any[] = [];
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    this.db.collection('/products').valueChanges().subscribe((productNames: any[]) => {
      const temp = new Array(productNames.length);
      productNames.forEach(element => {
        temp[element['display_order'] - 1] = {
          name: element['display_name'],
          db_name: element['collection_name'],
          hidden: element['hidden'],
          orderNum: element['display_order']};
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
          this.currentSubgroupSelection = this.subgroups[0]
          this.subgroupValueChanged(this.subgroups[0]);
        }
      } else { // same as the if block for now until I investigate whether this causes problems
        this.subgroups = subgroups;
        if (this.subgroups.length !== 0) {
          this.currentSubgroupSelection = this.subgroups[0]
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
          newColDefs.push({
            field: key
          });
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
    .doc(this.currentSubgroupSelection.name.replace('/', ','))
    .collection(this.currentSubgroupSelection.name.replace('/', ',')).valueChanges()
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
          newColDefs.push({
            field: key
          });
        });
        this.columnDefs = newColDefs;
      }
      this.rowData = products;
    });
  }

  toggleGroupHidden(group: any) {
    this.db.collection('/products').doc(group.db_name).update({
      hidden: !group.hidden
    });
  }

  groupOrderChanged(newGroups: any[]) {
    for (let i = 0; i < newGroups.length; i++) {
      if (newGroups[i].orderNum !== i + 1) {
        this.db.collection('products').doc(newGroups[i].db_name).update({display_order: i + 1});
      }
    }
  }

  // async addDBNameToProductSubgroups() {
  //   const batch = this.db.firestore.batch();
  //   for (let i = 0; i < this.products.length; i++) {
  //     const query = this.db.collection(this.products[i]['db_name']).ref.where('array', '==', true);
  //     await query.get().then((res) => {
  //       if (!res.empty) {
  //         res.forEach((doc) => {
  //           batch.update(doc.ref, {
  //             db_name: doc.id.replace('/', '-'),
  //             display_name: doc.id
  //           });
  //         });
  //       }
  //     });
  //   }
  //   console.log(batch.commit());
  // }
}
