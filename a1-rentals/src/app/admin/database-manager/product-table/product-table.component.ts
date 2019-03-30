import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFirestore, CollectionReference } from 'angularfire2/firestore';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  @Input() rowData: any[] = [];
  @Input() subgroups: any[] = [];
  @Input() columnDefs: any[] = [];
  @Input() currentGroupSelection: any;
  @Input() currentSubgroupSelection: any;
  newProductObjects: any[] = [{key: 'Name', value: ''}];
  constructor(private modalService: ModalService, private db: AngularFirestore) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.currentSubgroupSelection);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openAddProduct() {
    this.openModal('addProductModal');
  }

  addNewProduct() {
    const newObj = {};
      this.newProductObjects.forEach(element => {
        newObj[String(element.key).toLowerCase()] = element.value;
      });
    if (this.currentSubgroupSelection == null) {
      this.db.collection(this.currentGroupSelection['db_name']).doc(this.db.createId()).set(newObj);
    } else {
      this.db.collection(this.currentGroupSelection['db_name'])
      .doc(this.currentSubgroupSelection['db_name'])
      .collection(this.currentSubgroupSelection['db_name'])
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
    if (this.currentSubgroupSelection === null) {
      const docs = this.getCurrentDocID(this.currentGroupSelection['db_name'], this.currentSubgroupSelection, product);
      docs.get().then((res) => {
        if (res.docs.length === 1) {
          const id = res.docs[0].id;
          this.db.collection(this.currentGroupSelection['db_name']).doc(id).delete();
        }
      });
    } else {
      const docs = this.getCurrentDocID(this.currentGroupSelection['db_name'], this.currentSubgroupSelection, product);
      docs.get().then((res) => {
        if (res.docs.length === 1) {
          const id = res.docs[0].id;
          this.db.collection(this.currentGroupSelection['db_name'])
          .doc(this.currentSubgroupSelection['db_name'])
          .collection(this.currentSubgroupSelection['db_name'])
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
        this.db.collection(this.currentGroupSelection['db_name']).doc(id.toString()).set(editedProduct);
      } else {
        this.db.collection(this.currentGroupSelection['db_name'])
        .doc(this.currentSubgroupSelection['db_name'])
        .collection(this.currentSubgroupSelection['db_name'])
        .doc(id.toString()).set(editedProduct);
      }
    }
    this.clearNewProduct();
    this.closeModal('editProductModal');
  }

  openEditProductModal(product) {
    this.newProductObjects.pop();
    this.newProductObjects.push({key: 'db_id', value: ''});
    Object.keys(product).forEach((key) => {
      if (key === 'Name') {
        this.newProductObjects[0]['value'] = product[key];
      } else {
        this.newProductObjects.push({key: key, value: product[key]});
      }
    });
    let docs = this.getCurrentDocID(this.currentGroupSelection['db_name'], this.currentSubgroupSelection, product);
    console.log(docs);
    docs.get().then((res) => {
      if (res.docs.length === 1) {
        this.newProductObjects[0].value = res.docs[0].id;
        this.openModal('editProductModal');
      } else {
        console.log('multiple docs found');
        console.log(res.docs);
      }
    });
  }

  getCurrentDocID(productGroup: string,  productSubgroup: any, product: any) {
    let docs = null;
    console.log(productSubgroup);
    if (productSubgroup === null) {
      docs = this.db.collection(productGroup).ref;
      Object.keys(product).forEach((key) => {
        if (product[key] !== undefined && product[key] !== '') {
          docs = docs.where(key, '==', product[key]) as CollectionReference;
        }
      });
      return docs;
    } else {
      docs = this.db.collection(productGroup)
      .doc(productSubgroup.db_name)
      .collection(productSubgroup.db_name).ref;
      Object.keys(product).forEach((key) => {
        if (product[key] !== undefined && product[key] !== '') {
          docs = docs.where(key, '==', product[key]) as CollectionReference;
        }
      });
    }
    return docs;
  }

}
