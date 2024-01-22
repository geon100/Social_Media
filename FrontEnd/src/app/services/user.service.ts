import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';
import { NotificationData, Post, UserData } from '../models/all.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ApiBaseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  getMe():Observable<User>{
      return this.http.get<User>(`${this.ApiBaseUrl}/user/me`)
  }
  getFollowers(){
    return this.http.get<{followers:UserData[]}>(`${this.ApiBaseUrl}/user/followers`)
  }

  getUserByUsername(id:string='logged'){
    return this.http.get<{user:UserData,posts:Post[]}>(`${this.ApiBaseUrl}/user/getUser/${id}`)
  }

  followUser(userId:string|undefined){
    return this.http.patch<{status:boolean}>(`${this.ApiBaseUrl}/user/followUser`,{userId})
  }
  unfollowUser(userId:string|undefined){
    return this.http.patch<{status:boolean}>(`${this.ApiBaseUrl}/user/unfollowUser`,{userId})
  }

  getSuggestions(){
    return this.http.get<UserData[]>(`${this.ApiBaseUrl}/user/getSuggestions`)
  }
  reportUser(reportData:any){
    return this.http.post(`${this.ApiBaseUrl}/user/reportUser`,reportData)
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
    return this.http.patch<UserData>(`${this.ApiBaseUrl}/user/update`,form)
  }
  loadNotifications(){
    return this.http.get<NotificationData[]>(`${this.ApiBaseUrl}/user/getNotify`)
  }
  readNotifications(){
    return this.http.delete(`${this.ApiBaseUrl}/user/readNotify`)
  }
  acceptCollab(post:any){
    return this.http.patch(`${this.ApiBaseUrl}/post/acceptCollab`,{post})
  }
   rejectCollab(post:any){
    return this.http.patch(`${this.ApiBaseUrl}/post/rejectCollab`,{post})
  }
}
