import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-references-manager',
  templateUrl: './references-manager.component.html',
  styleUrls: ['./references-manager.component.css']
})
export class ReferencesManagerComponent implements OnInit {

  references: any[] = [];
  currentEditReference: any = {name: ''};
  currentDeleteReference: any;
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    this.db.collection('References').valueChanges().subscribe((references: any[]) => {
      const temp = new Array(references.length);
      references.forEach((element) => {
        temp[element.order_num - 1] = element;
      });
      this.references = temp;
    });
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    const batch = this.db.firestore.batch();
    if (event.currentIndex !== event.previousIndex) {
      moveItemInArray(this.references, event.previousIndex, event.currentIndex);
    }
    for (let i = 1; i <= this.references.length; i++) {
      if (this.references[i - 1].order_num !== i) {
        batch.update(this.db.doc('References/' + this.references[i - 1].db_name).ref, {
          order_num: i
        });
      }
    }
    batch.commit();
  }

  submitAddReference() {
    const id = this.db.createId();
    this.db.collection('References').doc(id).set({
      name: this.currentEditReference.name,
      order_num: this.references.length + 1,
      db_name: id
    });
    this.closeModal('addReferenceModal');
  }

  submitEditReference() {
    this.db.collection('References').doc(this.currentEditReference.db_name).update({
      name: this.currentEditReference.name
    });
    this.closeModal('editReferenceModal');
  }

  openEditReference(reference: any) {
    this.currentEditReference.name = reference.name;
    this.currentEditReference.db_name = reference.db_name;
    this.openModal('editReferenceModal');
  }

  deleteReference(reference: any) {
    const batch = this.db.firestore.batch();
    batch.delete(this.db.collection('References').doc(reference.db_name).ref);
    for (let i = reference.order_num; i < this.references.length; i++) {
      batch.update(this.db.collection('References').doc(this.references[i].db_name).ref,
      {order_num: this.references[i].order_num - 1});
    }
    batch.commit();
  }

  openAddReference() {
    this.currentEditReference.name = '';
    this.openModal('addReferenceModal');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
