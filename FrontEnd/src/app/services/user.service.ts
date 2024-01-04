import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ApiBaseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  getMe():Observable<User>{
      return this.http.get<User>(`${this.ApiBaseUrl}/user/me`)
  }

  getUserByUsername(id:string='logged'){
    return this.http.get(`${this.ApiBaseUrl}/user/getUser/${id}`)
  }

  followUser(userId:string|undefined){
    return this.http.patch(`${this.ApiBaseUrl}/user/followUser`,{userId})
  }
  unfollowUser(userId:string|undefined){
    return this.http.patch(`${this.ApiBaseUrl}/user/unfollowUser`,{userId})
  }

  getSuggestions(){
    return this.http.get(`${this.ApiBaseUrl}/user/getSuggestions`)
  }

  changeCover(form:any){
    return this.http.patch(`${this.ApiBaseUrl}/user/ChangeCover`,form)
  }
  changeProfile(form:any){
    return this.http.patch(`${this.ApiBaseUrl}/user/ChangeProfile`,form)
  }

  offline(){
    const data={status:false}
    return this.http.patch(`${this.ApiBaseUrl}/user/offline`,data)
  }

  updateProfile(form:any){
    return this.http.patch(`${this.ApiBaseUrl}/user/update`,form)
  }
}
