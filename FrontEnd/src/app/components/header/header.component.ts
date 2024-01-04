import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, UrlSegment, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  showHeader: boolean = true;

  constructor(private router: Router,private service:UserService) {}

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {  
        this.showHeader = !['/login', '/admin' , '/signup' ,'/admin/login','/admin/users', '/admin/dashboard','/admin/posts','/forgot-password'].includes(event.url);
      }
    });
  }

  logout(){
    this.service.offline().subscribe(()=>console.log('user offline'))
    localStorage.removeItem('userToken')
    this.router.navigate(['login'])
  }
  
  }

