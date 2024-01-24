import { Inject, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MessagesComponent } from './views/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loggedInGuard } from './guards/logged-in.guard';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ExploreComponent } from './views/explore/explore.component';
import { SnackbarService } from './services/snackbar.service';
import { wrongRouteGuardGuard } from './guards/wrong-route-guard.guard';
import { profileGuard } from './guards/profile.guard';


const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent,canActivate:[loggedInGuard]},
  {path:'signup',component:SignupComponent},
  {path:'chat',component:MessagesComponent,canActivate:[authGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[authGuard]},
  {path:'explore',component:ExploreComponent,canActivate:[authGuard]},
  { path: 'profile/:id', component: ProfileComponent,canActivate:[authGuard,profileGuard] },

  {path:'forgot-password',component:ForgotPasswordComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component:HomeComponent,canActivate: [wrongRouteGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
