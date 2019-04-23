import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  authStatus = 'Not logged in';
  currentEmail = '';
  newEmail = '';
  newPassword = '';
  newPassword2 = '';
  oldPassword = '';
  changeEmailStatus = '';
  changePasswordStatus = '';
  constructor(private authService: AngularFireAuth, private modalService: ModalService) {
    this.authService.authState.subscribe((state) => {
      if (state !== null) {
        this.authStatus = 'Logged in as ' + state.email;
        this.currentEmail = state.email;
      } else {
        this.authStatus = 'Not logged in';
      }
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

  openChangeEmail() {
    this.newEmail = '';
    this.changeEmailStatus = '';
    this.openModal('changeEmailModal');
  }

  submitChangeEmail() {
    this.authService.auth.currentUser.updateEmail(this.newEmail).then(success => {
      console.log(success);
      this.changeEmailStatus = 'Successfully changed email to ' + this.newEmail;
    }, error => {
      console.log(error);
    });
  }

  openChangePassword() {
    this.newPassword = '';
    this.newPassword2 = '';
    this.oldPassword = '';
    this.changePasswordStatus = '';
    this.openModal('changePasswordModal');
  }

  submitChangePassword() {
    if (this.newPassword === this.newPassword2) {
      this.authService.auth.signInWithEmailAndPassword(this.currentEmail, this.oldPassword).then(success => {
        this.authService.auth.currentUser.updatePassword(this.newPassword);
        this.changePasswordStatus = 'Password changed successfully';
      },
      error => {
        this.changePasswordStatus = 'Incorrect old password';
      });
    } else {
      this.changePasswordStatus = 'New passwords do not match';
    }
  }
}
