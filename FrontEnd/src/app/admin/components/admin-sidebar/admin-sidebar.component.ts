import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  hideSidebar = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1) 
    ).subscribe(() => {
      this.checkLoginRoute();
    });
  }

  ngAfterViewInit(): void {
    this.checkLoginRoute();
  }

  private checkLoginRoute(): void {
    this.hideSidebar = this.router.url.includes('/admin/login');
    this.cdr.detectChanges();
  }

  logout(){
    localStorage.removeItem('adminToken')
    this.router.navigate(['admin'])
  }
}
