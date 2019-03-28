import { Component, OnInit } from '@angular/core';
import { AngularFirestore, CollectionReference } from 'angularfire2/firestore';
import { GridOptions } from 'ag-grid-community';
import { map } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-database-manager',
  templateUrl: './database-manager.component.html',
  styleUrls: ['./database-manager.component.css']
})
export class DatabaseManagerComponent implements OnInit {

  currentGroupSelection: any;
  newProductObjects: any[] = [{key: 'Name', value: ''}];
  currentSubgroupSelection: any;
  hidden: boolean = false;
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
        //console.log('current group selection was null');
        this.currentGroupSelection = this.products.length === 0 ? {name: ''} : this.products[0];
      }
      console.log(this.products);
    });
  }

  ngOnInit() {
  }

  groupValueChanged(newGroup: any) {
    console.log(newGroup)
    this.currentGroupSelection = newGroup;
    this.currentSubgroupSelection = null;
    //console.log(this.currentGroupSelection);
    this.db.collection('/' + this.currentGroupSelection.db_name).valueChanges().pipe(map(productSubgroups => {
      return productSubgroups.filter((element: any) => element.hasOwnProperty('array') && element.array);
    })).subscribe((subgroups) => {
      console.log(subgroups);
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
        //console.log(products);
      }
    });
  }

  subgroupValueChanged(subgroup) {
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

  exposeSubTab() {
    if (this.currentGroupSelection !== undefined) {
      this.db.collection('/products').doc(this.currentGroupSelection.db_name).update({hidden: this.hidden});
    }
  }

  openAddProductSubgroup() {
    this.openModal('addProductSubgroupModal');
    //console.log('add product subgroup clicked');
  }

  openAddProduct() {
    this.openModal('addProductModal');
    //console.log('add product clicked');
  }

  toggleGroupHidden(group: any) {
    this.db.collection('/products').doc(group.db_name).update({
      hidden: !group.hidden
    });
    //console.log('toggle group hidden clicked');
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
    if (this.currentSubgroupSelection == null) {
      this.db.collection(this.currentGroupSelection.db_name).doc(this.db.createId()).set(newObj);
    } else {
      this.db.collection(this.currentGroupSelection.db_name)
      .doc(this.currentSubgroupSelection.name.replace('/', '-'))
      .collection(this.currentSubgroupSelection.name.replace('/', '-'))
      .doc(this.db.createId()).set(newObj);
    }
    this.newProductObjects = [{key: 'name', value: ''}];
    this.closeModal('addProductModal');
  }

  addProductField() {
    this.newProductObjects.push({key: '', value: ''});
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

  deleteProduct(product: any) {
    console.log(product);
    if (this.currentSubgroupSelection === null) {
      const docs = this.getCurrentDocID(this.currentGroupSelection.db_name, this.currentSubgroupSelection, product);
      docs.get().then((res) => {
        if (res.docs.length === 1) {
          console.log(res.docs[0]);
          const id = res.docs[0].id;
          this.db.collection(this.currentGroupSelection.db_name).doc(id).delete();
        }
      });
    } else {
      const docs = this.getCurrentDocID(this.currentGroupSelection.db_name, this.currentSubgroupSelection, product);
      docs.get().then((res) => {
        if (res.docs.length === 1) {
          console.log(res.docs[0]);
          const id = res.docs[0].id;
          this.db.collection(this.currentGroupSelection.db_name)
          .doc(this.currentSubgroupSelection.name.replace('/', '-'))
          .collection(this.currentSubgroupSelection.name.replace('/', '-'))
          .doc(id).delete();
        }
      });
    }
  }

  submitEditProduct() {
    let id = -1;
    const editedProduct = {};
    this.newProductObjects.forEach((obj) => {
      if (obj.key === 'db_id') {
        id = obj.value;
      } else {
        editedProduct[obj.key] = obj.value;
      }
    });
    if (id !== -1) {
      if (this.currentSubgroupSelection === null) {
        this.db.collection(this.currentGroupSelection.db_name).doc(id.toString()).set(editedProduct);
      } else {
        this.db.collection(this.currentGroupSelection.db_name)
        .doc(this.currentSubgroupSelection.name.replace('/', '-'))
        .collection(this.currentSubgroupSelection.name.replace('/', '-'))
        .doc(id.toString()).set(editedProduct);
      }
    }
    this.clearNewProduct();
    this.closeModal('editProductModal');
  }

  openEditProductModal(product) {
    this.newProductObjects.pop();
    this.newProductObjects.push({key: 'db_id', value: ''});
    console.log(this.newProductObjects);
    Object.keys(product).forEach((key) => {
      if (key === 'Name') {
        this.newProductObjects[0]['value'] = product[key];
      } else {
        this.newProductObjects.push({key: key, value: product[key]});
      }
    });
    let docs = this.getCurrentDocID(this.currentGroupSelection.db_name, this.currentSubgroupSelection, product);
    docs.get().then((res) => {
      if (res.docs.length === 1) {
        const id = res.docs[0].id;
        this.newProductObjects[0].value = res.docs[0].id;
        this.openModal('editProductModal');
      }
    });
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

  groupOrderChanged(newGroups: any[]) {
    console.log(newGroups);
    for (let i = 0; i < newGroups.length; i++) {
      if (newGroups[i].orderNum !== i + 1) {
        console.log(newGroups[i]);
        this.db.collection('products').doc(newGroups[i].db_name).update({display_order: i + 1});
      }
    }
  }
}
