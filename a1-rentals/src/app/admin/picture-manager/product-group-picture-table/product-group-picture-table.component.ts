import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { UploadService } from 'src/app/services/upload.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-product-group-picture-table',
  templateUrl: './product-group-picture-table.component.html',
  styleUrls: ['./product-group-picture-table.component.css']
})
export class ProductGroupPictureTableComponent implements OnInit {

  @Input() productGroups: any[];
  @Output() groupValueChanged = new EventEmitter<any>();
  newSubGroups: any[] = [];
  currentGroupSelection: any;
  currentChangeGroup: any;
  currentDeleteGroup: any;
  editImageURL: string;
  constructor(private db: AngularFirestore,
    private modalService: ModalService,
    private uplSvc: UploadService,
    private storage: AngularFireStorage) {
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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
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

  openAddImage(group: any) {
    this.currentChangeGroup = group;
    this.openModal('addProductGroupImageModal');
  }

  openChangeImage(group: any) {
    this.editImageURL = group.image_URL;
    this.currentChangeGroup = group;
    this.openModal('changeProductGroupImageModal');
  }

  openDeleteImage(group: any) {
    this.currentDeleteGroup = group;
    this.openModal('deleteProductGroupImageModal');
  }

  deleteProductGroupImage() {
    this.closeModal('deleteProductGroupImageModal');
    this.storage.storage.refFromURL(this.currentDeleteGroup.image_url).delete();
    this.db.doc(`/products/${this.currentDeleteGroup.db_name}`).update({image_url: ''});
  }
}
