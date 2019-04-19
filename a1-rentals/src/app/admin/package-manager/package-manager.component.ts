import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-package-manager',
  templateUrl: './package-manager.component.html',
  styleUrls: ['./package-manager.component.css']
})
export class PackageManagerComponent implements OnInit {

  packages: any[] = [];
  newPackage: any = {name: '', description: '', items: [{value: ''}]};
  currentPackageSelection: any;
  groupDummy: any = {db_name: 'packages'};
  productDummy: any = {db_name: ''};
  currentChangePackage: any;
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    this.db.collection('packages').valueChanges().subscribe((docList) => {
      this.packages = docList;
      console.log(this.packages);
      if (this.packages.length > 0) {
        this.currentPackageSelection = this.packages[0];
      }
    });
  }

  ngOnInit() {
  }

  packageSelected(pack: any, index: number) {
    this.currentPackageSelection = pack;
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

  deletePackage(pack) {
    this.db.collection('packages').doc(pack.db_name).delete();
  }

  openAddImage(pack) {
    console.log('Add image selected');
  }

  openManageImages(pack) {
    console.log('Manage images selected');
  }

}
