import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private ApiBaseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  
 addpost(form:FormData){
  console.log(form)
  return this.http.post(`${this.ApiBaseUrl}/post/addpost`,form)
 }
 
}
