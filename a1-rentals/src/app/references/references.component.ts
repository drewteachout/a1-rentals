import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {

  references: string[] = [];
  constructor(private db: AngularFirestore) {
    db.collection("/References").valueChanges().subscribe((referenceDocs) => {
      this.references = [];
      referenceDocs.forEach((element: any) => {
        this.references.push(element.name)
      })
    })
   }

  ngOnInit() {
  }

}
