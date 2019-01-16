import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  tab1: String;
  tab2: String;
  tab3: String;
  tab4: String;

  constructor() { 
    this.tab1 = "Popular Products"
    this.tab2 = "Rental Products"
    this.tab3 = "Packages"
    this.tab4 = "Contact Us"
  }

  ngOnInit() {
  }

}
