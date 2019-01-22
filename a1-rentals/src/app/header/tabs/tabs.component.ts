import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  tab1: any[];
  tab2: any[];
  tab3: any[];
  tab4: any[];
  tabs: any[];

  constructor() {
    this.tab1 = ['Popular Products', []];
    this.tab2 = ['Rental Products', [['Chairs', ['Big Chair', 'Little Chair', 'Our Chair']], ['Tents', []],
    ['Lights', []]]];
    this.tab3 = ['Packages', []];
    this.tab4 = ['Contact Us', []];
    this.tabs = [this.tab1, this.tab2, this.tab3, this.tab4];
  }

  ngOnInit() {
  }

}
