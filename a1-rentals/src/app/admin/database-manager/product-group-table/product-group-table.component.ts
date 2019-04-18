import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { defineBase } from '@angular/core/src/render3';

@Component({
  selector: 'app-product-group-table',
  templateUrl: './product-group-table.component.html',
  styleUrls: ['./product-group-table.component.css']
})
export class ProductGroupTableComponent implements OnInit, OnChanges {

  @Input() productGroups: any[];
  @Output() groupValueChanged = new EventEmitter<any>();
  @Output() groupOrderChanged = new EventEmitter<any[]>();
  newSubGroups: any[] = [];
  deleteProductGroup = {};
  newProductGroup = '';
  newProductGroupName = {old: '', new: '', db_name: ''};
  currentGroupSelection: any;
  constructor(private db: AngularFirestore, private modalService: ModalService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.productGroups.length > 0) {
      if (this.currentGroupSelection == null) {
        this.currentGroupSelection = this.productGroups[0];
        this.groupValueChanged.emit(this.productGroups[0]);
        this.productGroupRowSelected(this.productGroups[0], 0);
      } else {
        this.currentGroupSelection = this.productGroups[0];
        this.groupValueChanged.emit(this.productGroups[0]);
        this.productGroupRowSelected(this.productGroups[0], 0);
      }
    }
  }

  openAddProductGroup() {
    this.openModal('addProductGroupModal');
  }

  toggleGroupHidden(group: any) {
    this.db.collection('/products').doc(group.db_name).update({
      hidden: !group.hidden
    });

  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  submitAddNewProductGroup() {
    if (this.newSubGroups.length === 0) {
     this.db.collection('/' + this.newProductGroup.replace('/', '-')).doc('dummy').set({array: false});
    } else {
      this.newSubGroups.forEach((element) => {
        this.db.collection(this.newProductGroup.replace('/', '-')).doc(element.name.replace('/', '-')).set({
          array: true,
          hidden: false,
          display_name: element.name,
          description: '',
          db_name: element.name.replace('/', '-'),
          image_url: ''
        });
      });
    }
    this.db.collection('/products').doc(this.newProductGroup).set(
      {
        collection_name: this.newProductGroup.replace('/', '-'),
        display_name: this.newProductGroup,
        display_order: this.productGroups.length + 1,
        hidden: false,
        image_url: ''
      });
    this.closeModal('addProductGroupModal');
  }

  clearNewProductGroup() {
    this.newProductGroup = '';
    this.newSubGroups = [{name: '', }];
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
    this.currentGroupSelection = group;
    this.groupValueChanged.emit(this.currentGroupSelection);
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

  openEditProductGroup(group) {
    this.openModal('editProductGroupModal');
    this.newProductGroupName.old = group.name;
    this.newProductGroupName.db_name = group.db_name;
  }

  openDeleteProductGroup(group: any) {
    this.deleteProductGroup = group;
    this.deleteProductGroup['typedName'] = '';
    this.openModal('deleteProductGroupModal');
  }

  submitEditProductGroup() {
    this.db.collection('/products').doc(this.newProductGroupName.db_name).update({display_name: this.newProductGroupName.new});
    this.closeModal('editProductGroupModal');
    this.newProductGroupName.db_name = '';
    this.newProductGroupName.old = '';
    this.newProductGroupName.new = '';
  }

  async submitDeleteProductGroup() {
    console.log(this.deleteProductGroup);
    const batch = this.db.firestore.batch();
    const qs = await this.db.collection(this.deleteProductGroup['db_name']).ref.get();
    qs.forEach(doc => batch.delete(doc.ref));
    batch.delete(this.db.collection('products').doc(this.deleteProductGroup['db_name']).ref);
    console.log(this.productGroups[this.deleteProductGroup['display_order'] - 1]);
    for (let i = this.deleteProductGroup['display_order']; i < this.productGroups.length; i++) {
      batch.update(this.db.collection('products').doc(this.productGroups[i].db_name).ref,
      {display_order: this.productGroups[i].display_order - 1});
    }
    this.deleteProductGroup = {};
    this.closeModal('deleteProductGroupModal');
    batch.commit().catch((err) => {
      console.log(err);
      alert('Delete was unsuccessful, please try again');
    });
  }

  addSubTabClicked() {
    this.newSubGroups.push({name: ''});
  }

  removeSubGroup(index: number) {
    if (index !== this.newSubGroups.length - 1) {
     this.newSubGroups = this.newSubGroups.slice(0, index).concat(this.newSubGroups.slice(index + 1));
    } else {
      this.newSubGroups.pop();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex !== event.previousIndex) {
      moveItemInArray(this.productGroups, event.previousIndex, event.currentIndex);
      this.groupOrderChanged.emit(this.productGroups);
    }
  }
}
