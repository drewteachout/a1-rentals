import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-admin-product-tile',
  templateUrl: './admin-product-tile.component.html',
  styleUrls: ['./admin-product-tile.component.css']
})
export class AdminProductTileComponent implements OnInit {

  @Input() productName: string;
  @Input() productSource: string;
  @Input() path: string;
  @Input() db_name: string;
  @Input() display_order: number;
  @Output() edit: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() changeImage: EventEmitter<any[]> = new EventEmitter<any[]>();

  productGroups: any[] = [];
  productSubgroups: any[] = [];
  selectedProductGroup: any;
  selectedProductSubgroup: any;
  newPopularProductTitle: any;

  constructor(private modalService: ModalService, private db: AngularFirestore, private storage: AngularFireStorage) {
    this.db.collection('products').valueChanges().subscribe((docList: any[]) => {
      this.productGroups = docList;
    });
  }

  ngOnInit() {
  }

  editPopularProductSelected() {
    this.edit.emit([this.productName, this.path, this.db_name])
  }

  deletePopularProductSelected() {
    const batch = this.db.firestore.batch();
    this.db.collection('popular').ref.orderBy('display_order').where('display_order', '>', this.display_order).get().then((docList) => {
      docList.docs.forEach((doc) => {
        batch.update(doc.ref, {display_order: doc.get('display_order') - 1});
      });
    });
    batch.delete(this.db.collection('popular').doc(this.db_name).ref);
    batch.commit();
  }

  deletePopularProductImage() {
    this.db.collection('popular').doc(this.db_name).update({
      image_url: ''
    })
    this.storage.storage.refFromURL(this.productSource).delete();
  }

  changePopularProductImageSelected() {
    this.changeImage.emit([this.productSource, this.path, this.db_name]);
  }

  AddPopularProductImageSelected() {
    this.changeImage.emit([this.productSource, this.path, this.db_name]);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
