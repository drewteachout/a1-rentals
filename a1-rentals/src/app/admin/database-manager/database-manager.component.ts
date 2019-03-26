import { Component, OnInit } from '@angular/core';
import { AngularFirestore, CollectionReference } from 'angularfire2/firestore';
import { GridOptions } from 'ag-grid-community';
import { map } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';
import { diPublic } from '@angular/core/src/render3/di';

@Component({
  selector: 'app-database-manager',
  templateUrl: './database-manager.component.html',
  styleUrls: ['./database-manager.component.css']
})
export class DatabaseManagerComponent implements OnInit {

  public gridOptions: GridOptions;
  currentGroupSelection: any;
  newProductObjects: any[] = [{key: 'Name', value: ''}];
  newSubGroupObjects: any[] = [{name: ''}];
  newProductGroup = '';
  newSubGroups: any[] = [];
  currentSubGroupSelection: any;
  hidden: boolean = false;
  columnDefs = [];
  private gridApi;
  products: any[] = [];
  subGroups: any[] = [];
  rowData: any[] = [];
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    this.db.collection('/products').valueChanges().subscribe((productNames: any[]) => {
      this.products = [];
      productNames.forEach(element => {
        this.products.push({
          name: element['display_name'],
          db_name: element['collection_name'],
          hidden: element['hidden'],
          orderNum: element['display_order']});
      });
      if (this.currentGroupSelection === undefined) {
        //console.log('current group selection was null');
        this.currentGroupSelection = this.products.length === 0 ? {name: ''} : this.products[0];
        this.productGroupRowSelected(this.currentGroupSelection, 0);
      }
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
    //console.log(this.currentGroupSelection);
    this.db.collection('/' + this.currentGroupSelection.db_name).valueChanges().pipe(map(productSubGroups => {
      return productSubGroups.filter((element: any) => element.hasOwnProperty('array') && element.array);
    })).subscribe((subGroups) => {
      if (this.currentSubGroupSelection == null) {
        this.subGroups = subGroups;
        if (this.subGroups.length !== 0) {
          this.currentSubGroupSelection = this.subGroups[0]
          this.subGroupValueChanged();
        }
      }
    });
    this.db.collection('/' + this.currentGroupSelection.db_name).valueChanges().pipe(map(productSubGroups => {
      return productSubGroups.filter(element => !element.hasOwnProperty('array'));
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
      if (this.currentSubGroupSelection == null) {
        this.rowData = products;
        //console.log(products);
      }
    });
  }

  subGroupValueChanged() {
    this.db.collection('/' + this.currentGroupSelection.db_name)
    .doc(this.currentSubGroupSelection.name.replace('/', ','))
    .collection(this.currentSubGroupSelection.name.replace('/', ',')).valueChanges()
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
      //console.log(products);
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
    //console.log('add product subgroup clicked');
  }

  addProductGroup() {
    //console.log('add product group clicked');
    this.openModal('addProductGroupModal');
  }

  addProduct() {
    this.openModal('addProductModal');
    //console.log('add product clicked');
  }

  toggleGroupHidden(group: any) {
    this.db.collection('/products').doc(group.db_name).update({
      hidden: !group.hidden
    });
    //console.log('toggle group hidden clicked');
  }

  toggleSubGroupHidden() {
    //console.log(this.currentSubGroupSelection);
    this.db.collection(this.currentGroupSelection.db_name).doc(this.currentSubGroupSelection.name.replace('/', '-')).update({
      hidden: !this.currentSubGroupSelection.hidden
    });
    this.currentSubGroupSelection.hidden = !this.currentSubGroupSelection.hidden;
    //console.log(this.currentSubGroupSelection);
  }

  openModal(id: string) {
    //console.log(id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addNewProduct() {
    //console.log(this.newProductObjects);
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
   //console.log('add Subtab Clicked');
   this.newSubGroups.push({name: ''});
   //console.log(this.newSubGroups);
 }

 removeSubGroup(index: number) {
   if (index !== this.newSubGroups.length - 1) {
    this.newSubGroups = this.newSubGroups.slice(0, index).concat(this.newSubGroups.slice(index + 1));
   } else {
     this.newSubGroups.pop();
   }
 }

 addNewProductGroup() {
   if (this.newSubGroups.length === 0) {
    this.db.collection('/' + this.newProductGroup).doc('dummy').set({array: false});
   } else {
     this.newSubGroups.forEach((element) => {
       this.db.collection(this.newProductGroup).doc(element.name).set({array: true, hidden: false, name: element.name});
       //console.log('added ' + element.name + ' to ' + this.newProductGroup);
     });
   }
   this.closeModal('addProductGroupModal');
 }

 addSubGroup() {
  this.newSubGroupObjects.push({name: ''});
  }

  addNewSubGroup() {
    if (this.newSubGroupObjects.length === 0) {
      alert('Cannot add 0 subgroups');
    } else {
      this.newSubGroupObjects.forEach(element => {
        if (String(element.name).length !== 0) {
          this.db.collection(this.currentGroupSelection.db_name).doc(element.name).set({array: true, hidden: false, name: element.name});
        }
      });
    }
  }

  removeSubGroupObject(index: number) {
    if (index !== this.newSubGroupObjects.length - 1) {
      this.newSubGroupObjects = this.newSubGroupObjects.slice(0, index).concat(this.newSubGroupObjects.slice(index + 1));
    } else {
      this.newSubGroupObjects.pop();
    }
  }

  clearNewProductGroup() {
    this.newProductGroup = '';
    this.newSubGroups = [{name: '', }];
  }

  clearNewProductSubGroup() {
    this.newSubGroupObjects = [{name: ''}];
  }

  clearNewProduct() {
    this.newProductObjects = [{'name': ''}];
  }

  switchDropdown(className: string, i: number, $event: MouseEvent) {
    $event.stopPropagation();
    const selected = document.getElementById(className + i).classList;
    if (selected.contains('is-active')) {
      selected.remove('is-active');
    } else {
      const activeDropdowns = document.getElementsByClassName('is-active');
      for (let j = 0; j < activeDropdowns.length; j++) {
        const currentElement = activeDropdowns.item(j);
        if (currentElement.id.includes(className)) {
          currentElement.classList.remove('is-active');
        }
      }
      selected.add('is-active');
    }
  }

  productGroupRowSelected(group: any, index: number) {
    //(group, index);
    this.currentGroupSelection = group;
    this.groupValueChanged();
    if (document.getElementById('productGroupRow' + index) != null) {
      const selected = document.getElementById('productGroupRow' + index).classList;
      const selectedRows = document.getElementsByClassName('is-selected');
      for (let j = 0; j < selectedRows.length; j++) {
        const currentElement = selectedRows.item(j);
        if (currentElement.id.includes('productGroupRow')) {
          currentElement.classList.remove('is-selected');
        }
      }
      selected.add('is-selected');
    }
  }

  productSubGroupRowSelected(group: any, index: number) {
    //console.log(group, index);
    this.currentSubGroupSelection = group;
    this.subGroupValueChanged();
    const selected = document.getElementById('productSubGroupRow' + index).classList;
    const selectedRows = document.getElementsByClassName('is-selected');
    for (let j = 0; j < selectedRows.length; j++) {
      const currentElement = selectedRows.item(j);
      if (currentElement.id.includes('productSubGroupRow')) {
        currentElement.classList.remove('is-selected');
      }
    }
    selected.add('is-selected');
  }

  deleteProduct(product: any) {
    console.log(product);
    if (this.currentSubGroupSelection === null) {
      const docs = this.getCurrentDocID(this.currentGroupSelection.db_name, this.currentSubGroupSelection, product);
      docs.get().then((res) => {
        if (res.docs.length === 1) {
          console.log(res.docs[0]);
          const id = res.docs[0].id;
          this.db.collection(this.currentGroupSelection.db_name).doc(id).delete();
        }
      });
    } else {
      const docs = this.getCurrentDocID(this.currentGroupSelection.db_name, this.currentSubGroupSelection, product);
      docs.get().then((res) => {
        if (res.docs.length === 1) {
          console.log(res.docs[0]);
          const id = res.docs[0].id;
          this.db.collection(this.currentGroupSelection.db_name)
          .doc(this.currentSubGroupSelection.name.replace('/', '-'))
          .collection(this.currentSubGroupSelection.name.replace('/', '-'))
          .doc(id).delete();
        }
      });
    }
  }

  getCurrentDocID(productGroup: string,  productSubgroup: any, product: any) {
    let docs = null;
    if (productSubgroup === null) {
      docs = this.db.collection(productGroup).ref;
      Object.keys(product).forEach((key) => {
         docs = docs.where(key, '==', product[key]) as CollectionReference;
      });
      return docs;
    } else {
      docs = this.db.collection(productGroup)
      .doc(productSubgroup.name)
      .collection(productSubgroup.name).ref;
      Object.keys(product).forEach((key) => {
        docs = docs.where(key, '==', product[key]) as CollectionReference;
      });
    }
    return docs;

  }


}
