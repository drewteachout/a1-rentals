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
  numPopularProducts = 0;
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
    this.selectedProductGroup = undefined;
    this.selectedProductSubgroup = undefined;
    this.newPopularProductTitle = '';
    this.productSubgroups = [];
    this.openModal('addPopularProductModal');
  }

  loadData() {
    this.db.collection('/popular').valueChanges().subscribe((popular_items: any[]) => {
      this.popularProducts = []
      this.numPopularProducts = popular_items.length;
      const popular_items_sorted = popular_items.sort((a: any, b: any) => a.display_order - b.display_order)
      for (let i = 0; i < popular_items_sorted.length; i++) {
        const key = Math.floor(i / this.numColumns);
        let data = this.popularProducts[key];
        if (data === undefined) {
          this.popularProducts.push([]);
          data = this.popularProducts[key];
        }
        data.push([popular_items_sorted[i].name,
          popular_items_sorted[i].image_url,
          popular_items_sorted[i].path,
          popular_items_sorted[i].db_name]);
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
        if (last === -1) {
          // second choice should be none or undefined
          console.log('second choice should be none or undefined')
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
    console.log($event);
    this.selectedProductGroup = undefined;
    this.selectedProductSubgroup = undefined;
    this.editPopularProductPath = $event[1];
    this.editPopularProductDB_Name = $event[2];
    this.newPopularProductTitle = $event[0];
    const first = this.editPopularProductPath.indexOf('/');
    console.log(first);
    if (first === -1) {
      console.log(this.editPopularProductPath);
      this.productGroups.forEach((element) => {
        if (element.collection_name === this.editPopularProductPath) {
          this.selectedProductGroup = element;
          this.productGroupChanged(undefined);
        }
      });
    } else {
      const temp = this.editPopularProductPath.slice(0, this.editPopularProductPath.indexOf('/'));
      this.productGroups.forEach((element) => {
        if (element.collection_name === temp) {
          this.selectedProductGroup = element;
          this.productGroupChanged(undefined);
        }
      });
    }
    this.openModal('editPopularProductModal');
  }

  submitEditPopularProduct() {
    let path: string;
    if (this.selectedProductSubgroup === undefined || this.selectedProductSubgroup.display_name === 'None') {
      path = this.selectedProductGroup.collection_name;
      console.log("no here");
    } else {
      path = this.selectedProductGroup.collection_name + '/' + this.selectedProductSubgroup.db_name;
      console.log("here");
    }
    this.db.collection('popular').doc(this.editPopularProductDB_Name).update({
      path: path,
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
      console.log("no here");
    } else {
      path = this.selectedProductGroup.collection_name + '/' + this.selectedProductSubgroup.db_name;
      console.log("here");
    }
    const id = this.db.createId();
    this.db.collection('popular').doc(id).set({
      db_name: id,
      image_url: '',
      name: this.newPopularProductTitle,
      path: path,
      display_order: this.numPopularProducts + 1
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
