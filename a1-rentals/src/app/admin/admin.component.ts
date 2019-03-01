import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { GridOptions } from 'ag-grid-community';
import { map } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  entryComponents: [ToggleSwitchComponent]
})
export class AdminComponent implements OnInit {

  public gridOptions: GridOptions;
  currentGroupSelection: any;
  private newProductObjects: any[] = [{key: 'Name', value: ''}];
  private newProductGroup = '';
  private hasSubGroup = false;
  private newSubGroups: any[] = [];
  currentSubGroupSelection: any;
  hidden: boolean = false;
  columnDefs = [];
  private gridApi;
  products: any[] = [];
  subGroups: any[] = [];
  rowData: any[] = [];
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    this.db.collection('/products').valueChanges().subscribe((productNames: any[]) => {
      productNames.forEach(element => {
        this.products.push({
          name: element['display_name'],
          db_name: element['collection_name'],
          hidden: element['hidden'],
          orderNum: element['display_order']});
      });
    });
    this.gridOptions = <GridOptions>{
      rowData: this.rowData,
      columnDefs: this.columnDefs,
      context: {
          componentParent: this
      }
    };
  }

  ngOnInit() {
  }

  groupValueChanged() {
    this.currentSubGroupSelection = null;
    let newRowData = [];
    this.db.collection('/' + this.currentGroupSelection.db_name).valueChanges().pipe(map(productSubGroups => {
      return productSubGroups.filter(element => element.hasOwnProperty('array'));
    })).subscribe((subGroups) => {
      if (this.currentSubGroupSelection == null) {
        this.subGroups = subGroups;
      }
    });
    this.db.collection('/' + this.currentGroupSelection.db_name).valueChanges().pipe(map(productSubGroups => {
      return productSubGroups.filter(element => !element.hasOwnProperty('array'));
    })).subscribe((products: []) => {
      if (products !== undefined && products.length > 0) {
        let mySet = new Set();
        products.forEach((product: any) => {
          Object.keys(product).forEach((key) => {
            mySet.add(key);
          })
        });
        let newColDefs = [];
        mySet.forEach((key) => {
          newColDefs.push({
            field: key
          });
        });
        this.columnDefs = newColDefs;
      }
      if (this.currentSubGroupSelection == null) {
        this.rowData = products;
        console.log(products)
      }
    });
  }

  subGroupValueChanged() {
    let dbSub = this.db.collection('/' + this.currentGroupSelection.db_name)
    .doc(this.currentSubGroupSelection.name.replace('/', ','))
    .collection(this.currentSubGroupSelection.name.replace('/', ',')).valueChanges()
    .subscribe((products: any[]) => {
      if (products !== undefined && products.length > 0) {
        let mySet = new Set();
        products.forEach((product: any) => {
          Object.keys(product).forEach((key) => {
            mySet.add(key);
          })
        });
        let newColDefs = [];
        mySet.forEach((key) => {
          newColDefs.push({
            field: key
          });
        });
        this.columnDefs = newColDefs;
      }
      this.rowData = products;
      console.log(products);
    });
  }

  exposeSubTab() {
    if (this.currentGroupSelection !== undefined) {
      this.db.collection('/products').doc(this.currentGroupSelection.db_name).update({hidden: this.hidden});
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  addProductSubGroup() {
    this.openModal('addProductSubGroupModal');
    console.log('add product subgroup clicked');
  }

  addProductGroup() {
    console.log('add product group clicked');
    this.openModal('addProductGroupModal');
  }

  addProduct() {
    this.openModal('addProductModal');
    console.log('add product clicked');
  }

  toggleGroupHidden() {
    this.db.collection('/products').doc(this.currentGroupSelection.db_name).update({
      hidden: !this.currentGroupSelection.hidden
    });
    this.currentGroupSelection.hidden = !this.currentGroupSelection.hidden;
    console.log('toggle group hidden clicked');
  }

  toggleSubGroupHidden() {
    console.log(this.currentSubGroupSelection);
    this.db.collection(this.currentGroupSelection.db_name).doc(this.currentSubGroupSelection.name.replace('/', '-')).update({
      hidden: !this.currentSubGroupSelection.hidden
    });
    this.currentSubGroupSelection.hidden = !this.currentSubGroupSelection.hidden;
    console.log(this.currentSubGroupSelection);
  }

  openModal(id: string) {
    console.log(id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addNewProduct() {
    console.log(this.newProductObjects);
    const newObj = {};
      this.newProductObjects.forEach(element => {
        newObj[String(element.key).toLowerCase()] = element.value;
      });
    if (this.currentSubGroupSelection == null) {
      this.db.collection(this.currentGroupSelection.db_name).doc(this.db.createId()).set(newObj);
    } else {
      this.db.collection(this.currentGroupSelection.db_name)
      .doc(this.currentSubGroupSelection.name.replace('/', '-'))
      .collection(this.currentSubGroupSelection.name.replace('/', '-'))
      .doc(this.db.createId()).set(newObj);
    }
    this.newProductObjects = [{key: 'name', value: ''}];
    this.closeModal('addProductModal');
  }

  addProductField() {
    this.newProductObjects.push({key: '', value: ''});
  }

 addSubTabClicked() {
   console.log('add Subtab Clicked');
   this.newSubGroups.push({name: ''});
   console.log(this.newSubGroups);
 }

 removeSubGroup(index) {
   if (index !== this.newSubGroups.length - 1) {
    this.newSubGroups = this.newSubGroups.slice(0, index).concat(this.newSubGroups.slice(index + 1));
   } else {
     this.newSubGroups.pop();
   }
 }

 addNewProductGroup() {
   if (this.newSubGroups.length === 0) {
    this.db.collection('/' + this.newProductGroup).doc('dummy').set({});
   } else {
     this.newSubGroups.forEach((element) => {
       this.db.collection(this.newProductGroup).doc(element.name).set({array: true, hidden: false, name: element.name});
       console.log('added ' + element.name + ' to ' + this.newProductGroup);
     });
   }
   this.closeModal('addProductGroupModal');
 }

}
