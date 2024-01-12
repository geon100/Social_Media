import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserCred, RegisterUser } from 'src/app/models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private ApiBaseUrl = 'http://localhost:3000/admin'

  constructor(private http:HttpClient) { }

  login(usercred:UserCred):Observable<{token:string}>{
      return this.http.post<{token:string}>(`${this.ApiBaseUrl}/signin`,usercred)
      // console.log(usercred)
      // return of({token:'abc'})
  }
  getUsers():Observable<any>{
    return this.http.get(`${this.ApiBaseUrl}/allUsers`)
  }
  
  changeUserStatus(userid:string){
    return this.http.patch(`${this.ApiBaseUrl}/block`,{userid})
  }
  changePostStatus(postId:string){
    return this.http.patch(`${this.ApiBaseUrl}/blockpost`,{postId})
  }
  
  getPosts():Observable<any>{
    return this.http.get(`${this.ApiBaseUrl}/allposts`)
  }
  getReports(){
    return this.http.get(`${this.ApiBaseUrl}/allreports`)
  }
  
}
