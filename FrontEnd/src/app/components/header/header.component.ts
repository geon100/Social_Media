import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, UrlSegment, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {  
        this.showHeader = !['/login', '/admin' , '/signup' ,'/admin/login','/admin/users', '/admin/dashboard','/admin/posts'].includes(event.url);
      }
    });
  }

  logout(){
    localStorage.removeItem('userToken')
    this.router.navigate(['login'])
  }
  
  }

