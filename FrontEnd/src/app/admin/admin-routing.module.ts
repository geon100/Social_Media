import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authguardGuard } from './guard/authguard.guard';
import { loggedinGuard } from './guard/loggedin.guard';
import { PostsComponent } from './components/posts/posts.component';
import { ReportsComponent } from './components/reports/reports.component';

const adminRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: AdminLoginComponent,canActivate:[loggedinGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: '',
        component: AdminComponent,
        canActivateChild:[authguardGuard],
        children: [
          { path: 'dashboard', component: AdminDashboardComponent },
          { path: 'users', component: AdminUsersComponent },
          { path: 'posts', component: PostsComponent },
          { path: 'reports', component: ReportsComponent },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
