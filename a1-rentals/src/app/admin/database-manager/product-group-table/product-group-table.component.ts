import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-group-table',
  templateUrl: './product-group-table.component.html',
  styleUrls: ['./product-group-table.component.css']
})
export class ProductGroupTableComponent implements OnInit {

  @Input() productGroups: any[];
  @Output() groupValueChanged = new EventEmitter<any>();
  newSubGroups: any[] = [];
  newProductGroup = '';
  newProductGroupName = {old: '', new: '', db_name: ''};
  currentGroupSelection: any;
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    this.groupValueChanged.emit()
  }

  ngOnInit() {
  }

  openAddProductGroup() {
    //console.log('add product group clicked');
    this.openModal('addProductGroupModal');
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

  addNewProductGroup() {
    if (this.newSubGroups.length === 0) {
     this.db.collection('/' + this.newProductGroup).doc('dummy').set({array: false});
    } else {
      this.newSubGroups.forEach((element) => {
        this.db.collection(this.newProductGroup).doc(element.name).set({array: true, hidden: false, name: element.name});
        //console.log('added ' + element.name + ' to ' + this.newProductGroup);
      });
    }
    this.db.collection('/products').doc(this.newProductGroup).set(
      {
        collection_name: this.newProductGroup.replace('/', '-'),
        display_name: this.newProductGroup,
        display_order: 0,
        hidden: false
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
    //(group, index);
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
    console.log(group);
    this.openModal('editProductGroupModal');
    this.newProductGroupName.old = group.name;
    this.newProductGroupName.db_name = group.db_name;
    console.log(this.newProductGroupName);
  }

  submitEditProductGroup() {
    console.log(this.newProductGroupName);
    this.db.collection('/products').doc(this.newProductGroupName.db_name).update({display_name: this.newProductGroupName.new});
    this.closeModal('editProductGroupModal');
    this.newProductGroupName.db_name = '';
    this.newProductGroupName.old = '';
    this.newProductGroupName.new = '';
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
}
