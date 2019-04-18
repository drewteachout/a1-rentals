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
  authStatus = false;
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
