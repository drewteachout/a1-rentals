import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  constructor(public authService: AngularFireAuth) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.auth.signInWithEmailAndPassword(this.email, this.password).then(res => {
      console.log(res);
      this.email = '';
      this.password = '';
    }, err => {
      this.email = '';
      this.password = '';
      console.log('Could not log in');
    });
  }

  logout() {
    this.authService.auth.signOut();
  }
}
