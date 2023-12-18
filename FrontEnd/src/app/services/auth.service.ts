import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser, UserCred } from '../models/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ApiBaseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  login(usercred:UserCred):Observable<{token:string}>{
      return this.http.post<{token:string}>(`${this.ApiBaseUrl}/auth/signin`,usercred)
  }

  signup(userObj:RegisterUser):Observable<{status:boolean}>{
    return this.http.post<{status:boolean}>(`${this.ApiBaseUrl}/auth/signup`,userObj)
  }
 
 
}
