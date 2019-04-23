import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  newUserEmail = '';
  newUserPassword = '';
  newUserPassword2 = '';
  newPassword = '';
  newPassword2 = '';
  newPasswordStatus = '';
  newUserStatus = '';
  authStatus = false;
  forgotPasswordEmail: string = '';
  forgotPasswordStatus: string = '';
  constructor(private authService: AngularFireAuth, private modalService: ModalService) {
    this.authService.authState.subscribe((state) => {
      if (state !== null) {
        this.authStatus = true;
      } else {
        this.authStatus = false;
      }
      console.log(this.authStatus);
    });
  }

  ngOnInit() {
  }

  login($event) {
    console.log($event);
    if ($event === undefined || $event.keyCode === 13) {
      this.authService.auth.signInWithEmailAndPassword(this.email, this.password).then(res => {
        console.log(res);
        this.email = '';
        this.password = '';
        this.openModal('loginSuccessModal');
      }, err => {
        this.email = '';
        this.password = '';
        console.log('Could not log in');
        alert('Login Unsuccessful');
      });
    }
  }

  openAddNewUser() {
    this.openModal('addNewUserModal');
    this.newUserEmail = '';
    this.newUserPassword = '';
    this.newUserPassword2 = '';
  }

  submitAddNewUser() {
    if (this.newUserPassword == this.newUserPassword2) {
      console.log('found identical passwords');
      this.newUserStatus = 'Passwords were not identical';
      this.authService.auth.createUserWithEmailAndPassword(this.newUserEmail, this.newUserPassword).then(success => {
        console.log(success);
        this.newUserStatus = 'Success';
      },
      error => {
        console.log(error);
        this.newUserStatus = error.message;
      });
    } else {
      this.newUserStatus = 'Passwords were not identical';
    }
  }

  openForgotPassword() {
    this.openModal('forgotPasswordModal')
  }

  submitForgotPassword() {
    this.authService.auth.sendPasswordResetEmail(this.forgotPasswordEmail).then(success => {
      console.log(success);
      this.forgotPasswordStatus = 'Email has been sent to ' + this.forgotPasswordEmail + '.';
    },
    error => {
      console.log(error)
      this.forgotPasswordStatus = 'Email address not found.';
    });
  }

  closeForgotPassword() {
    this.forgotPasswordEmail = '';
    this.forgotPasswordStatus = '';
    this.closeModal('forgotPasswordModal');
  }

  logout() {
    this.authService.auth.signOut();
    alert('Logout Successful');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
