import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { Contact } from './contact';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  databaseName = 'a1-rentals';
  email = '';
  phoneNumber = '';
  firstName = '';
  lastName = '';
  subject = '';
  message = '';

  constructor(private db: AngularFirestore, private modalService: ModalService) {
  }

  @Input() submitLocation: string;

  model = new Contact(18, '', '', '', '', '','');
  submitted = false;

  ngOnInit() {  }

  newContact() {
    this.model = new Contact(42, '', '', '', '', '', '');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getInfo() {
    this.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.phoneNumber = (<HTMLInputElement>document.getElementById('phoneNumber')).value;
    this.firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
    this.lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
    this.subject = (<HTMLInputElement>document.getElementById('subject')).value;
    this.message = (<HTMLInputElement>document.getElementById('message')).value;
  }

  onSubmit() {
    console.log(this.submitLocation);
    if (this.submitLocation === 'quote') {
      console.log('Quote');
    } else {
      console.log('Contact Us');
    }
    this.getInfo();
    this.db.collection('messages').doc(this.db.createId()).set({'firstName': this.firstName,
      'lastName': this.lastName, 'email': this.email, 'phoneNumber': this.phoneNumber, 
      'subject': this.subject, 'message': this.message});
  }
}