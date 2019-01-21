import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  model = new Contact(18, 'Conor', 'Brownell', 'cbrownell3@gatech.edu', 'Test', 'Test message');

  newContact() {
    this.model = new Contact(42, '', '', '', '', '');
  }

  submitted = false;

  onSubmit() {this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  
  constructor() { }

  ngOnInit() {
  }

}
