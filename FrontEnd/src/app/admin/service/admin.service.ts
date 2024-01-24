import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post, UserData } from 'src/app/models/all.interface';
import { UserCred, RegisterUser } from 'src/app/models/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private ApiBaseUrl = `${environment.apiUrl}/admin`

  constructor(private http:HttpClient) { }

  login(usercred:UserCred):Observable<{token:string}>{
      return this.http.post<{token:string}>(`${this.ApiBaseUrl}/signin`,usercred)
    
  }
  getUsers():Observable<UserData[]>{
    return this.http.get<UserData[]>(`${this.ApiBaseUrl}/allUsers`)
  }
  
  changeUserStatus(userid:string){
    return this.http.patch(`${this.ApiBaseUrl}/block`,{userid})
  }
  changePostStatus(postId:string){
    return this.http.patch(`${this.ApiBaseUrl}/blockpost`,{postId})
  }
  
  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.ApiBaseUrl}/allposts`)
  }
  getReports(){
    return this.http.get(`${this.ApiBaseUrl}/allreports`)
  }
  
}
