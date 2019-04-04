import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-references-manager',
  templateUrl: './references-manager.component.html',
  styleUrls: ['./references-manager.component.css']
})
export class ReferencesManagerComponent implements OnInit {

  references: any[] = [];
  constructor(private db: AngularFirestore) {
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

}
