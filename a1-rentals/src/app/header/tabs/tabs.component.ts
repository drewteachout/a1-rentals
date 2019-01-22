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
    this.tab2 = ['Rental Products', [['Chairs', []], ['Tents', ['Elite Pole Tents', 'Frame Tents']],
      ['Lights', ['L.E.D. Dance Floor Lights', 'Lighted Tables', 'LED Furniture Rentals', 'Uplighting Rentals']]]];
    this.tab3 = ['Packages', []];
    this.tab4 = ['Contact Us', []];
    this.tabs = [this.tab1, this.tab2, this.tab3, this.tab4];
  }

  ngOnInit() {
  }

  // Calculates appropriate padding necessary based on where we are in the list
  setSubTabStyle(index, list) {
    let percentage = (100/list.length * index).toString() + '%';
    let styles = {
      'top': percentage
    };
    return styles;
  }
}
