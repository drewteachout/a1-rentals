import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-package-manager',
  templateUrl: './package-manager.component.html',
  styleUrls: ['./package-manager.component.css']
})
export class PackageManagerComponent implements OnInit {

  packages: any[] = [];
  newPackage: any = {name: '', description: '', items: [{value: ''}]};
  groupDummy: any = {db_name: 'packages'};
  productDummy: any = {db_name: ''};
  currentChangePackage: any;
  constructor(private db: AngularFirestore, private modalService: ModalService, private storage: AngularFireStorage) {
    this.db.collection('packages').valueChanges().subscribe((docList: any[]) => {
      this.packages = new Array(docList.length);
      docList.forEach((element) => {
        this.packages[element.display_order - 1] = element;
      });
    });
  }

  ngOnInit() {
  }

  packageSelected(pack: any, index: number) {
    if (document.getElementById('packageRow' + index) != null) {
      const selected = document.getElementById('packageRow' + index).classList;
      const selectedRows = document.getElementsByClassName('is-selected');
      for (let j = 0; j < selectedRows.length; j++) {
        const currentElement = selectedRows.item(j);
        if (currentElement.id.includes('packageRow')) {
          currentElement.classList.remove('is-selected');
        }
      }
      selected.add('is-selected');
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openAddPackage() {
    this.newPackage.name = '';
    this.newPackage.description = '';
    this.newPackage.items = [{value: ''}];
    this.newPackage.db_name = '';
    this.newPackage.price = 0;
    this.newPackage.image_urls = [];
    this.newPackage.display_order = this.packages.length + 1;
    this.openModal('addPackageModal');
  }

  openEditPackage(pack: any) {
    this.newPackage.name = pack.name;
    this.newPackage.description = pack.description;
    this.newPackage.items = [];
    pack.items.forEach(element => {
      this.newPackage.items.push({value: element});
    });
    if (this.newPackage.items.length === 0) {
      this.newPackage.items.push({value: ''});
    }
    this.newPackage.db_name = pack.db_name;
    this.newPackage.price = pack.price;
    this.newPackage.image_urls = pack.image_urls;
    this.newPackage.display_order = pack.display_order;
    this.openModal('addPackageModal');
  }

  addItem() {
    this.newPackage.items.push({value: ''});
  }

  removeItem(index: number) {
    this.newPackage.items.splice(index, 1);
  }

  submitPackage() {
    if (this.newPackage.db_name === '') {
      this.newPackage.db_name = this.db.createId();
    }
    const newItems = this.newPackage.items.map((element) => element.value);
    this.newPackage.items = newItems;
    this.db.collection('packages').doc(this.newPackage.db_name).set(this.newPackage);
    this.closeModal('addPackageModal');
  }

  deletePackage(pack: any) {
    this.db.collection('packages').doc(pack.db_name).delete();
  }

  openAddImage(pack: any) {
    this.currentChangePackage = pack;
    this.productDummy.db_name = pack.db_name;
    this.openModal('addPackageImageModal');
  }

  openManageImages(pack: any) {
    this.currentChangePackage = pack;
    this.openModal('changePackageImagesModal');
  }

  deletePackageImage(url: string) {
    this.storage.storage.refFromURL(url).delete();
    const path = 'packages/' + this.currentChangePackage.db_name;
    this.db.doc(path).ref.update({
      image_urls: firebase.firestore.FieldValue.arrayRemove(url)
    });
    this.currentChangePackage.image_urls = this.currentChangePackage.image_urls.filter((element) => element !== url);
    if (this.currentChangePackage.image_urls.length === 0) {
      this.closeModal('changePackageImagesModal');
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex !== event.previousIndex) {
      moveItemInArray(this.packages, event.previousIndex, event.currentIndex);
    }
    const batch = this.db.firestore.batch();
    for (let i = 0; i < this.packages.length; i++) {
      if (this.packages[i].display_order !== i + 1) {
        batch.update(this.db.collection('packages').doc(this.packages[i].db_name).ref, {display_order: i + 1});
      }
    }
    batch.commit();
  }

}
