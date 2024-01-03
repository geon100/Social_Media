import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { MessagesComponent } from './views/messages/messages.component';
import { MiniProfileComponent } from './components/mini-profile/mini-profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './state/UserState/user.reducer';
import { UserEffects } from './state/UserState/user.effects';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ErrorInterceptorInterceptor } from './interceptors/error-interceptor.interceptor';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PostComponent } from './components/post/post.component';
import { PostviewComponent } from './views/postview/postview.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ExploreComponent } from './views/explore/explore.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { SharelistComponent } from './components/sharelist/sharelist.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MessagesComponent,
    MiniProfileComponent,
    LoginComponent,
    SignupComponent,
    AddPostComponent,
    ForgotPasswordComponent,
    PostComponent,
    PostviewComponent,
    CommentsComponent,
    ProfileComponent,
    ExploreComponent,
    ImageModalComponent,
    SharelistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      user: userReducer,
    }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    PickerModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },{
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
