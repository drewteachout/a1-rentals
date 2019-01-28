import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  model = new Contact(18, '', '', '', '', '');
  submitted = false;

  constructor() { }

  ngOnInit() {  }

  newContact() {
    this.model = new Contact(42, '', '', '', '', '');
  }

  // i think this is where we put the stuff to deal with the form data
  onSubmit() {this.submitted = true; }
}
