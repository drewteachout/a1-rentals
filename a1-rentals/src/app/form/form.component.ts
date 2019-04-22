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
  email = 'samloop16@gmail.com';
  functions = require('firebase-functions');
  nodemailer = require('nodemailer');
  mailTransport = this.nodemailer.createTransport();

  constructor(private db: AngularFirestore, private modalService: ModalService) {
  }

  @Input() submitLocation: String

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

  onSubmit() {
    if (this.submitLocation == "quote") {
      console.log("Quote")
    } else {
      console.log("Contact Us")
    }
    this.submitted = true; }

  async sendEmail() {
    const mailOptions = {
      from: `${this.databaseName} <noreply@firebase.com>`,
      to: this.email,
      subject: `Contact Form Submitted`,
      text:`The following Contact Info was submitted: ` + "\n" + this.model.toString()
    };

    await this.mailTransport.sendMail(mailOptions);
    console.log('New welcome email sent to:', this.email);
    return null;
  }
}