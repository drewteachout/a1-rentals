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
  currentEditReference: any = {newName: '', name: ''};
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

  fixReferences() {
    console.log('fix references clicked');
    this.db.collection('References').ref.get().then((docs) => {
      let i = 1;
      docs.forEach((doc) => {
        doc.ref.update({
          order_num: i,
          db_name: doc.id
        });
        i++;
      });
    });
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

  submitAddReference() {
    const id = this.db.createId();
    this.db.collection('References').doc(id).set({
      name: this.currentEditReference.newName,
      order_num: this.references.length + 1,
      db_name: id
    });
    this.closeModal('addReferenceModal');
  }

  submitEditReference() {
    this.db.collection('References').doc(this.currentEditReference.db_name).update({
      name: this.currentEditReference.newName
    });
    this.closeModal('editReferenceModal');
  }

  openEditReference(reference: any) {
    this.currentEditReference = reference;
    this.currentEditReference.newName = '';
    this.openModal('editReferenceModal');
  }

  deleteReference(reference: any) {
    this.db.collection('References').doc(reference.db_name).delete();
  }

  openAddReference() {
    this.currentEditReference.newName = '';
    this.openModal('addReferenceModal');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
