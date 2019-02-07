import { Component, OnInit, Input } from '@angular/core';
import CarouselJson from '../../json/carousel.json';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  // @Input() titles = '';
  // @Input() urls = '';
  @Input() productKey: string;

  urls: string[] = [
    'assets/images/blackChair.jpg',
    'assets/images/whiteChair.jpg',
    'assets/images/resinChair.jpg',
    // 'assets/images/ledBarStool.jpg',
    // 'assets/images/ledBeanBagChair.jpg'
  ];
  titles: string[] = [
    'Poly/metal chair rental - black',
    'Poly/metal chair rental - WEDDING white',
    'Resin padded chair rental - white',
    // 'L.E.D. Bar stool',
    // 'L.E.D. Beanbag chair'
  ];
  slides: any[];

  constructor() {
  }

  ngOnInit() {
    this.slides = [
      { url: 'assets/images/blackChair.jpg',
        title: 'Poly/metal chair rental - black'
      },
      { url: 'assets/images/whiteChair.jpg',
        title: 'Poly/metal chair rental - WEDDING white'
      },
      { url: 'assets/images/resinChair.jpg', title: 'Resin padded chair rental - white'},
      { url: 'assets/images/ledBarStool.jpg', title: 'L.E.D. Bar stool'},
      { url: 'assets/images/ledBeanBagChair.jpg', title: 'L.E.D. Beanbag chair'},
      { url: 'assets/images/ledBench.jpg', title: 'L.E.D. Bench'},
      { url: 'assets/images/ledCube1.png', title: 'L.E.D. Cube, 16" x 16"'},
      { url: 'assets/images/ledCube2.jpg', title: 'L.E.D. Cube, 20" x 20"'},
    ];
    this.loadData();
  }

  loadData() {
    // console.log(this.images[0].title);
    // for (let i = 0; i < this.images.length; i++) {
    //   this.urls.push(this.images[i].url);
    //   this.titles.push(this.images[i].title);
    //   console.log('looping');
    // }
  }
}
