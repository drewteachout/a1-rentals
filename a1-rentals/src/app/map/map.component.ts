import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string = 'Our Location';
  lat = 33.939;
  lng = -84.539;

  latCenter = 33.953;
  lngCenter = -84.550;

  constructor() { }

  ngOnInit() {
  }

}
