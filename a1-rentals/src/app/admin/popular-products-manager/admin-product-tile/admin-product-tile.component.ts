import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFirestore } from 'angularfire2/firestore';

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

  constructor(private modalService: ModalService, private db: AngularFirestore) {
  }

  ngOnInit() {
  }

  editPopularProductPathSelected() {
    console.log('Edit product selected');
    console.log(this.db_name);
    this.openModal('editPopularProductsModal');
  }

  deletePopularProductSelected() {
    console.log('Delete product selected');
    console.log(this.db_name);
    this.db.collection('popular').doc(this.db_name).delete();
  }

  changePopularProductImageSelected() {
    this.openModal('addPopularProductImageModal');
  }

  AddPopularProductImageSelected() {
    this.openModal('addPopularProductImageModal');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
