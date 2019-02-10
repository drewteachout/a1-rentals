import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  private lastID: number = 0;

  constructor(private router: Router) {
    router.events.subscribe((a: RouterEvent) => {
      if(a instanceof NavigationEnd) {
        let url = a.url.substring(1);
        url = url.replace('%20', ' ');
        document.getElementById("Popular Products").className = "button-tab primary";
        document.getElementById("Rental Products").className = "button-tab primary";
        document.getElementById("Packages").className = "button-tab primary";
        document.getElementById("Contact Us").className = "button-tab primary";
        document.getElementById("Admin Tools").className = "button-tab primary";
        if(document.getElementById(url) != null) {
          document.getElementById(url).className = "button-tab accent";
        }
      }
    });
  }

  ngOnInit() {
  }
}
