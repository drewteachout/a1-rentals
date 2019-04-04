import { Component, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore, DocumentSnapshot } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-picture-drop',
  templateUrl: './picture-drop.component.html',
  styleUrls: ['./picture-drop.component.css']
})
export class PictureDropComponent {

  @Input() group: any;
  @Input() subgroup: any;
  @Input() product: any;
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    console.log(event);
    console.log(this.group, this.subgroup, this.product);
    if (event.length === 0) {
      return;
    }
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      alert('Please only add image files');
      return;
    }

    // The storage path
    let path: string;
    if (this.product === undefined) {
      if (this.subgroup === undefined) {
        path = this.group.db_name + `/${new Date().getTime()}_${file.name}`;
        if (this.group.hasOwnProperty('image_url') && this.group.image_url !== '') {
          this.storage.storage.refFromURL(this.group.image_url).delete();
        }
      } else {
        path = `${this.group.db_name}/${this.subgroup.db_name}/${new Date().getTime()}_${file.name}`;
        if (this.subgroup.hasOwnProperty('image_url') && this.subgroup.image_url !== '') {
          this.storage.storage.refFromURL(this.subgroup.image_url).delete();
        }
      }
    } else if (this.subgroup === undefined) {
      path = `${this.group.db_name}/${this.product.db_name}/${new Date().getTime()}_${file.name}`;
    } else {
      path = `${this.group.db_name}/${this.subgroup.db_name}/${this.product.db_name}/${new Date().getTime()}_${file.name}`;
    }

    // Totally optional metadata
    const customMetadata = { app: 'A1-rentals admin site' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          console.log(this.group, this.subgroup, this.product);
        }
      }),
      finalize(() => {
        this.storage.ref(path).getDownloadURL().subscribe((download) => {
          this.downloadURL = of(download);
          let db_path: string;
          if (this.product === undefined) {
            if (this.subgroup === undefined) {
              db_path = `/products/${this.group.db_name}`;
              this.db.doc(db_path).update({image_url: download});
            } else {
              db_path = `${this.group.db_name}/${this.subgroup.db_name}`;
              this.db.doc(db_path).update({image_url: download});
            }
          } else if (this.subgroup === undefined) {
            db_path = `${this.group.db_name}/${this.product.db_name}`;
            this.db.doc(db_path).get().subscribe((doc: firebase.firestore.DocumentSnapshot) => {
              console.log(doc);
              console.log(download);
            });
          } else {
            db_path = `${this.group.db_name}/${this.subgroup.db_name}/
              ${this.subgroup.db_name}/${this.product.db_name}`;
            this.db.doc(db_path).get().subscribe((doc: firebase.firestore.DocumentSnapshot) => {
              console.log(doc);
              console.log(download);
            });
          }
        });
      })
    );
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
