import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ApiBaseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  getMe():Observable<User>{
      return this.http.get<User>(`${this.ApiBaseUrl}/user/me`)
  }
}
