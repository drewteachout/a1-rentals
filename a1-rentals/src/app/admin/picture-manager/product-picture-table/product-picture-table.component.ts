import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-product-picture-table',
  templateUrl: './product-picture-table.component.html',
  styleUrls: ['./product-picture-table.component.css']
})
export class ProductPictureTableComponent implements OnInit {
  @Input() rowData: any[] = [];
  @Input() subgroups: any[] = [];
  @Input() columnDefs: any[] = [];
  @Input() currentGroupSelection: any;
  @Input() currentSubgroupSelection: any;
  currentChangeProduct: any;
  constructor(private modalService: ModalService, private db: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
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

  openAddImages(product: any) {
    this.currentChangeProduct = product;
    console.log(this.currentChangeProduct);
    this.openModal('addProductImageModal');
  }

  openRemoveImages(product: any) {
    this.currentChangeProduct = product;
    console.log(this.currentChangeProduct);
    this.openModal('removeProductImageModal');
  }

  deleteProductImage(url) {
    this.storage.storage.refFromURL(url).delete();
    if (this.currentSubgroupSelection != null) {
      const path = this.currentGroupSelection.db_name + '/'
        + this.currentSubgroupSelection.db_name + '/'
        + this.currentSubgroupSelection.db_name + '/'
        + this.currentChangeProduct.db_name;
      this.db.doc(path).ref.update({
        image_urls: firebase.firestore.FieldValue.arrayRemove(url)
      });
      this.currentChangeProduct.image_urls = this.currentChangeProduct.image_urls.filter((element) => element !== url);
    } else {
      const path = this.currentGroupSelection.db_name + '/'
        + this.currentChangeProduct.db_name;
      this.db.doc(path).ref.update({
        image_urls: firebase.firestore.FieldValue.arrayRemove(url)
      });
      this.currentChangeProduct.image_urls = this.currentChangeProduct.image_urls.filter((element) => element !== url);
    }
    if (this.currentChangeProduct.image_urls.length === 0) {
      this.closeModal('removeProductImageModal');
    }
  }
}
