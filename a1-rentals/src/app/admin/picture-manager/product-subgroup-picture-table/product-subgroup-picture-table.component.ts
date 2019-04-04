import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-product-subgroup-picture-table',
  templateUrl: './product-subgroup-picture-table.component.html',
  styleUrls: ['./product-subgroup-picture-table.component.css']
})
export class ProductSubgroupPictureTableComponent implements OnInit {
  @Input() productSubgroups: any[];
  @Input() currentGroupSelection: any;
  @Output() subgroupValueChanged = new EventEmitter<any>();
  currentSubgroupSelection: any;
  currentChangeSubgroup: any;
  currentDeleteSubgroup: any;
  editImageURL: string;
  constructor(private db: AngularFirestore, private modalService: ModalService, private storage: AngularFireStorage) { }

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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openAddImage(subgroup: any) {
    this.currentChangeSubgroup = subgroup;
    this.openModal('addProductSubgroupImageModal');
  }

  openChangeImage(subgroup: any) {
    this.editImageURL = subgroup.image_URL;
    this.currentChangeSubgroup = subgroup;
    this.openModal('changeProductSubgroupImageModal');
  }

  openDeleteImage(subgroup: any) {
    this.currentDeleteSubgroup = subgroup;
    this.openModal('deleteProductSubgroupImageModal');
  }

  deleteProductSubgroupImage() {
    this.closeModal('deleteProductSubgroupImageModal');
    console.log(this.currentDeleteSubgroup);
    this.storage.storage.refFromURL(this.currentDeleteSubgroup.image_url).delete();
    this.db.doc(`${this.currentGroupSelection.db_name}/${this.currentDeleteSubgroup.db_name}`)
      .update({image_url: ''});
  }
}
