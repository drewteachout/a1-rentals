import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
  }

  buttonClicked() {
    const jsonContent = require("./products.json")['product'];
    Object.keys(jsonContent).forEach(key => {
      const nestedContent = jsonContent[key];
      if (!(nestedContent instanceof Array)) {
        console.log("No arrays here");
        console.log(nestedContent);
        Object.keys(nestedContent).forEach(docTitle => {
          if(nestedContent[docTitle] instanceof Array) {
            const nestedArray = nestedContent[docTitle];
            console.log("found an array " + nestedArray);
            for(let i = 0; i < nestedArray.length; i++) {
              this.db.collection(key.replace('/', '-'))
              .doc(docTitle.replace('/', '-'))
              .set({
                array: true,
                name: docTitle
              })
              .then((res) => {
                  console.log("Document successfully written!");
                  this.db.collection(key.replace('/', '-'))
                  .doc(docTitle.replace('/', '-')).collection(docTitle.replace('/', '-')).doc(i.toString())
                  .set(nestedArray[i])
                  .then((res) => {
                    console.log("Second document successfully written!");
                  })
                  .catch((error) => {
                    console.error("Error writing second document: ", error);  
                  })
              })
              .catch((error) => {
                  console.error("Error writing document: ", error);
              });
            }
          } else {
            console.log("Arrays here")
            this.db.collection(key.replace('/', '-'))
            .doc(docTitle.replace('/', '-'))
            .set(nestedContent[docTitle])
            .then((res) => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
          }
        });
      } else {
        console.log(nestedContent);
        for(let i = 0; i < nestedContent.length; i++) {
          this.db.collection(key.replace('/', '-'))
            .doc(i.toString())
            .set(nestedContent[i])
            .then((res) => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
      }
  });
  }
}
