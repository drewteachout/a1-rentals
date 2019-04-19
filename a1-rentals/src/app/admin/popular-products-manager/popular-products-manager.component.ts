import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-popular-products-manager',
  templateUrl: './popular-products-manager.component.html',
  styleUrls: ['./popular-products-manager.component.css']
})
export class PopularProductsManagerComponent implements OnInit {

  popularProducts: any[] = [];
  productGroups: any[] = [];
  productSubgroups: any[] = [];
  selectedProductGroup: any = undefined;
  editPopularProductPath: string;
  editPopularProductDB_Name: string;
  selectedProductSubgroup: any = undefined;
  groupDummy: any = {db_name: 'popular'};
  subgroupDummy: any = {db_name: ''};
  newPopularProductTitle: string;

  private numColumns = 5;
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    for (let i = 0; i < this.numColumns; i++) {
      this.popularProducts.push([]);
    }
    this.loadData();
    this.db.collection('products').valueChanges().subscribe((groups: any) => {
      this.productGroups = groups;
    });
  }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addProductSelected() {
    this.openModal('addPopularProductModal');
  }

  loadData() {
    this.db.collection('/popular').valueChanges().subscribe((popular_items: any[]) => {
      this.popularProducts = []
      for (let i = 0; i < this.numColumns; i++) {
        this.popularProducts.push([]);
      }
      for (let i = 0; i < popular_items.length; i++) {
        const key = i % this.numColumns;
        const data = this.popularProducts[key];
        data.push([popular_items[i].name,
          popular_items[i].image_url,
          popular_items[i].path,
          popular_items[i].db_name]);
        this.popularProducts[key] = data;
      }
    });
  }

  productGroupChanged($event) {
    this.selectedProductSubgroup = {
      display_name: 'None',
      db_name: ''
    };
    this.db.collection(this.selectedProductGroup.collection_name).valueChanges().pipe(map((docList) => {
      return docList.filter((element: any) => element.hasOwnProperty('array') && element.array);
    })).subscribe((docList: any[]) => {
      this.productSubgroups = docList;
      if (this.productSubgroups.length > 0) {
        this.productSubgroups.push({
          display_name: 'None',
          db_name: ''
        });
      }
      if ($event === undefined) {
        //Sent here from an edit
        const last = this.editPopularProductPath.lastIndexOf('/');
        if (last === this.editPopularProductPath.length - 1) {
          // second choice should be none or undefined
          if (docList.length === 0) {
            this.selectedProductSubgroup = undefined;
          } else {
            this.selectedProductSubgroup = this.productSubgroups[this.productSubgroups.length - 1];
          }
        } else {
          const subgroup_name = this.editPopularProductPath.slice(last + 1);
          this.productSubgroups.forEach((element) => {
            if (element.db_name === subgroup_name) {
              this.selectedProductSubgroup = element;
            }
          })
        }
      }
    });
  }

  editPopularProductSelected($event: any[]) {
    this.editPopularProductPath = $event[1];
    this.editPopularProductDB_Name = $event[2];
    this.newPopularProductTitle = $event[0];
    const first = this.editPopularProductPath.slice(0, this.editPopularProductPath.indexOf('/'));
    this.productGroups.forEach((element) => {
      if (element.collection_name === first) {
        this.selectedProductGroup = element;
        this.productGroupChanged(undefined);
      }
    });
    this.openModal('editPopularProductModal');
  }

  submitEditPopularProduct() {
    this.db.collection('popular').doc(this.editPopularProductDB_Name).update({
      path: this.selectedProductGroup.collection_name + '/' + this.selectedProductSubgroup.db_name,
      name: this.newPopularProductTitle
    });
    this.closeModal('editPopularProductModal');
    this.newPopularProductTitle = '';
    this.editPopularProductDB_Name = '';
    this.editPopularProductPath = '';
    this.selectedProductGroup = undefined;
    this.selectedProductSubgroup = undefined;
  }

  submitAddPopularProduct() {
    let path: string;
    if (this.selectedProductSubgroup === undefined || this.selectedProductSubgroup.display_name === 'None') {
      path = this.selectedProductGroup.collection_name;
    } else {
      path = this.selectedProductGroup.collection_name + '/' + this.selectedProductSubgroup.db_name;
    }
    const id = this.db.createId();
    this.db.collection('popular').doc(id).set({
      db_name: id,
      image_url: '',
      name: this.newPopularProductTitle,
      path: path
    });
    this.newPopularProductTitle = '';
    this.selectedProductGroup = undefined;
    this.selectedProductSubgroup = undefined;
    this.productSubgroups = [];
  }

  popularProductImageChangeSelected($event) {
    console.log($event);
    this.subgroupDummy.db_name = $event[2];
    this.groupDummy.image_url = $event[0];
    this.openModal('changePopularProductImageModal');
  }
}
