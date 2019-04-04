import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from '../services/modal.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  authStatus = 'Not logged in';
  constructor(private authService: AngularFireAuth) {
    this.authService.authState.subscribe((state) => {
      if (state !== null) {
        this.authStatus = 'Logged in as ' + state.email;
      } else {
        this.authStatus = 'Not logged in';
      }
    });
  }

  ngOnInit() {
  }
}
