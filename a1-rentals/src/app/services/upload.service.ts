import { Injectable } from '@angular/core';
import { Upload } from '../util/upload';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload, path: string) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(path + upload.file.name).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.ref.getDownloadURL();
        upload.name = upload.file.name;
        this.saveFileData(upload, path);
      }
    );
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, path: string) {
    this.db.list(path).push(upload);
  }
}