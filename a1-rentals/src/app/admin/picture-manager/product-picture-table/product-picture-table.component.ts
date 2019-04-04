import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFirestore } from 'angularfire2/firestore';

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
  constructor(private modalService: ModalService, private db: AngularFirestore) { }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openAddProduct() {
    this.openModal('addProductModal');
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
}
