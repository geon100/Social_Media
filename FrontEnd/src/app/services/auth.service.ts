import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser, UserCred, newPasswordObj } from '../models/auth.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SnackbarService } from './snackbar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ApiBaseUrl = environment.apiUrl

  constructor(private http:HttpClient,private router: Router,private cookieService:CookieService,private snackBar:SnackbarService) { }

  login(usercred:UserCred):Observable<{token:string,refreshToken:string}>{
      return this.http.post<{token:string,refreshToken:string}>(`${this.ApiBaseUrl}/auth/signin`,usercred)
  }

  signup(userObj:RegisterUser):Observable<{status:boolean}>{
    return this.http.post<{status:boolean}>(`${this.ApiBaseUrl}/auth/signup`,userObj)
  }
  sendOtp(email:string){
    return this.http.post<{status:boolean}>(`${this.ApiBaseUrl}/auth/sendOtp`,{email})
  }

  resetpassword(newPasswordData:newPasswordObj){
    return this.http.post<{status:boolean}>(`${this.ApiBaseUrl}/auth/resetPassword`,newPasswordData)
  }
  logout(){
    localStorage.removeItem('userToken')
    this.router.navigate(['login'])
  }

  refreshToken():Observable<any>{
    const refreshToken = this.cookieService.get('refreshToken');
    if (!refreshToken) {
      this.snackBar.showError('Refresh token expired')
      this.logout(); 
      return throwError(()=>'Refresh token not found');
      
    }
    return this.http.post(`${this.ApiBaseUrl}/auth/generateNewAccess`, { refreshToken })
  }
  
 
}
