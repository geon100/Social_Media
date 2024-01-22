import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Route, Router, UrlSegment, Event as NavigationEvent } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  showHeader: boolean = true;
  constructor(private router: Router,private service:UserService,private authservice:AuthService,private dialog: MatDialog) {}

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {  
        this.showHeader = !['/login', '/admin' , '/signup' ,'/admin/login','/admin/users', '/admin/dashboard','/admin/posts','/forgot-password'].includes(event.url);
      }
    });
    
  }
  
  logout(){
    this.service.offline().subscribe(()=>console.log('user offline'))
    this.authservice.logout()
  }
  
  }

