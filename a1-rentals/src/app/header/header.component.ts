import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  unhighlightTabs() {
    document.getElementById("Popular Products").className = "button-tab primary";
    document.getElementById("Rental Products").className = "button-tab primary";
    document.getElementById("Packages").className = "button-tab primary";
    document.getElementById("Contact Us").className = "button-tab primary";
  }
}
