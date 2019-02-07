import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterViewInit {

  tab1: any[];
  tab2: any[];
  tab3: any[];
  tab4: any[];
  tabs: any[];
  previousTab: string = "Popular Products";

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

  ngAfterViewInit() {
    let clickedButton = document.getElementById(this.previousTab);
    clickedButton.className = "button-tab accent";
  }

  // Calculates appropriate padding necessary based on where we are in the list
  setSubTabStyle(index, list) {
    const percentage = (100 / list.length * index).toString() + '%';
    const styles = {
      'top': percentage
    };
    return styles;
  }

  toggleButton(buttonName: string) {
    let previousButton = document.getElementById(this.previousTab);
    let clickedButton = document.getElementById(buttonName);
    previousButton.className = clickedButton.className;
    clickedButton.className = "button-tab accent";
    this.previousTab = buttonName;
  }
}
