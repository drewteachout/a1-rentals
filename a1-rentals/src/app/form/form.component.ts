import { Component, OnInit, Input } from '@angular/core';
import { Contact } from './contact';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  @Input() submitLocation: String

  model = new Contact(18, '', '', '', '', '');
  submitted = false;

  constructor() { }

  ngOnInit() {  }

  newContact() {
    this.model = new Contact(42, '', '', '', '', '');
  }

  onSubmit() {
    if(this.submitLocation == "qoute") {
      console.log("Quote")
    } else {
      console.log("Contact Us")
    }
    this.submitted = true; }
}
