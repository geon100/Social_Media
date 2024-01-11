import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AdmintokenInterceptor } from './interceptor/admintoken.interceptor';
import { PostsComponent } from './components/posts/posts.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { UsergraphComponent } from './components/usergraph/usergraph.component';
import { AgChartsAngularModule } from 'ag-charts-angular';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminSidebarComponent,
    PostsComponent,
    ViewPostComponent,
    UsergraphComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgChartsAngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }