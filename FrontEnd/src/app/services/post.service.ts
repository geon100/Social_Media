import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private ApiBaseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  loadHomeposts(){
    return this.http.get(`${this.ApiBaseUrl}/post/getHomeUserPosts`)
  }
  loadposts(){
    return this.http.get(`${this.ApiBaseUrl}/post/getUserPosts`)
  }

 addpost(form:FormData){
  return this.http.post(`${this.ApiBaseUrl}/post/addpost`,form)
 }

togglelike(post:string){
  return this.http.patch(`${this.ApiBaseUrl}/post/likepost`,{post})
}

addComment(CommentObj:any){
  return this.http.post(`${this.ApiBaseUrl}/post/addcomment`,CommentObj)
}

delComment(commentId:string,postId:string){
  return this.http.post(`${this.ApiBaseUrl}/post/delcomment`,{commentId,postId})
}
 getPost(postId:string){
  
  return this.http.get(`${this.ApiBaseUrl}/post/getPost/${postId}`)
 }
}
