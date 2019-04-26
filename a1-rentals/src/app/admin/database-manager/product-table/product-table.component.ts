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
  newProductObjects: any[] = [{key: 'name', value: ''}, {key: 'price', value: 0}, {key: '', value: ''}];
  constructor(private modalService: ModalService, private db: AngularFirestore) { }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openAddProduct() {
    this.newProductObjects = [{key: 'name', value: ''}, {key: 'price', value: 0}, {key: '', value: ''}];
    this.openModal('addProductModal');
  }

  addNewProduct() {
    const newObj = {};
      this.newProductObjects.forEach(element => {
        if (isNaN(Number(element.value))) {
          newObj[element.key] = element.value;
        } else {
          newObj[element.key] = Number(element.value);
        }
      });
    newObj['image_urls'] = [];
    const id = this.db.createId();
    newObj['db_name'] = id;
    if (this.currentSubgroupSelection == null) {
      this.db.collection(this.currentGroupSelection['db_name']).doc(id).set(newObj);
    } else {
      this.db.collection(this.currentGroupSelection['db_name'])
      .doc(this.currentSubgroupSelection['db_name'])
      .collection(this.currentSubgroupSelection['db_name'])
      .doc(id).set(newObj);
    }
    this.closeModal('addProductModal');
  }

  addProductField() {
    this.newProductObjects.push({key: '', value: ''});
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
      const id = product.db_name;
      this.db.collection(this.currentGroupSelection['db_name']).doc(id).delete();
    } else {
      const id = product.db_name;
      this.db.collection(this.currentGroupSelection['db_name'])
      .doc(this.currentSubgroupSelection['db_name'])
      .collection(this.currentSubgroupSelection['db_name'])
      .doc(id).delete();
    }
  }

  submitEditProduct() {
    let id = '';
    const editedProduct = {};
    this.newProductObjects.forEach((obj) => {
      if (obj.key === 'db_name') {
        id = obj.value;
        editedProduct[obj.key] = obj.value;
      } else {
        if (isNaN(Number(obj.value)) || obj.value.hasOwnProperty('length')) {
          // length property check is because Number([]) evaluates to 0 for some unknown reason
          editedProduct[obj.key] = obj.value;
        } else {
          editedProduct[obj.key] = Number(obj.value);
        }
      }
    });
    if (this.currentSubgroupSelection === null) {
      this.db.collection(this.currentGroupSelection['db_name']).doc(id).set(editedProduct);
    } else {
      this.db.collection(this.currentGroupSelection['db_name'])
      .doc(this.currentSubgroupSelection['db_name'])
      .collection(this.currentSubgroupSelection['db_name'])
      .doc(id).set(editedProduct);
    }
    this.closeModal('editProductModal');
  }

  openEditProductModal(product: any) {
    this.newProductObjects = [{key: 'name', value: ''}, {key: 'price', value: 0}];
    Object.keys(product).forEach((key) => {
      if (key === 'name') {
        this.newProductObjects[0].value = product.name;
      } else if (key === 'price') {
        this.newProductObjects[1].value = product.price;
      } else {
        this.newProductObjects.push({key: key, value: product[key]});
      }
    });
    this.openModal('editProductModal');
  }

  removeProductObject(index: number) {
    this.newProductObjects.splice(index, 1);
  }

}
