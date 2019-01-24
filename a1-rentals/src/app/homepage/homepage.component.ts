import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: any[];

  constructor() {
    this.products = [['Elite Pole Tents', '../../assets/images/ElitePollTent.jpg'],
      ['Tables', '../../assets/images/RectangleTables.jpg'], ['Chairs', '../../assets/images/whiteChair.jpg']];
  }

  ngOnInit() {
  }

}
