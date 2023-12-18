import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MessagesComponent } from './views/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loggedInGuard } from './guards/logged-in.guard';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent,canActivate:[loggedInGuard]},
  {path:'signup',component:SignupComponent},
  {path:'chat',component:MessagesComponent,canActivate:[authGuard]},
  // { path: 'profile', loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
