import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-product-subgroup-table',
  templateUrl: './product-subgroup-table.component.html',
  styleUrls: ['./product-subgroup-table.component.css']
})
export class ProductSubgroupTableComponent implements OnInit {

  @Input() productSubgroups: any[];
  @Input() currentGroupSelection: any;
  @Output() subgroupValueChanged = new EventEmitter<any>();
  newSubgroupObjects: any[] = [{name: ''}];
  editProductSubgroup: any = {newName: '', oldName: '', db_name: ''};
  currentSubgroupSelection: any;
  deleteProductSubgroup: any = {};
  constructor(private db: AngularFirestore, private modalService: ModalService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.productSubgroups.length > 0) {
      this.currentSubgroupSelection = this.productSubgroups[0];
    }
  }

  productSubgroupRowSelected(group: any, index: number) {
    this.currentSubgroupSelection = group;
    this.subgroupValueChanged.emit(this.currentSubgroupSelection);
    const selected = document.getElementById('productSubgroupRow' + index).classList;
    const selectedRows = document.getElementsByClassName('is-selected');
    for (let j = 0; j < selectedRows.length; j++) {
      const currentElement = selectedRows.item(j);
      if (currentElement.id.includes('productSubgroupRow')) {
        currentElement.classList.remove('is-selected');
      }
    }
    selected.add('is-selected');
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

  addSubgroup() {
    this.newSubgroupObjects.push({name: ''});
  }

  addNewSubgroup() {
    if (this.newSubgroupObjects.length === 0) {
      alert('Cannot add 0 subgroups');
    } else {
      this.newSubgroupObjects.forEach(element => {
        if (String(element.name).length !== 0) {
          this.currentSubgroupSelection = null;
          this.db.collection(this.currentGroupSelection.db_name).doc(element.name.replace('/', '-')).set({
            array: true,
            hidden: false,
            display_name: element.name,
            db_name: element.name.replace('/', '-'),
            image_url: '',
            description: ''
          });
        }
      });
    }
    this.closeModal('addProductSubgroupModal');
  }

  removeSubgroupObject(index: number) {
    if (index !== this.newSubgroupObjects.length - 1) {
      this.newSubgroupObjects = this.newSubgroupObjects.slice(0, index).concat(this.newSubgroupObjects.slice(index + 1));
    } else {
      this.newSubgroupObjects.pop();
    }
  }

  clearNewProductSubgroup() {
    this.newSubgroupObjects = [{name: ''}];
  }

  toggleSubgroupHidden(subgroup) {
    this.db.collection(this.currentGroupSelection.db_name).doc(subgroup.name.replace('/', '-')).update({
      hidden: !subgroup.hidden
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openEditProductSubgroupModal(subgroup: any) {
    this.editProductSubgroup.oldName = subgroup.display_name;
    this.editProductSubgroup.db_name = subgroup.db_name;
    this.editProductSubgroup.newName = '';
    this.openModal('editProductSubgroupModal');
  }

  openAddProductSubgroupModal() {
    this.openModal('addProductSubgroupModal');
  }

  openDeleteProductSubgroupModal(subgroup: any) {
    this.deleteProductSubgroup.display_name = subgroup.display_name;
    this.deleteProductSubgroup.db_name = subgroup.db_name;
    this.deleteProductSubgroup.typedName = '';
    this.openModal('deleteProductSubgroupModal');
  }

  submitEditProductSubgroup() {
    this.db.collection(this.currentGroupSelection.db_name)
    .doc(this.editProductSubgroup.db_name)
    .update({
      display_name: this.editProductSubgroup.newName
    });
    this.closeModal('editProductSubgroupModal');
  }

  submitDeleteProductSubgroup() {
    this.db.collection(this.currentGroupSelection.db_name).doc(this.deleteProductSubgroup.db_name).delete();
    this.closeModal('deleteProductSubgroupModal');
  }
}
