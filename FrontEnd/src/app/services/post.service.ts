import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private ApiBaseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  loadHomeposts(page:number){
    return this.http.get(`${this.ApiBaseUrl}/post/getHomeUserPosts`, {
      params: { page: page.toString() }
    });
  }
  loadposts(page:number){
    return this.http.get(`${this.ApiBaseUrl}/post/getUserPosts`, {
      params: { page: page.toString() }
    });
  }

 addpost(form:FormData){
  return this.http.post(`${this.ApiBaseUrl}/post/addpost`,form)
 }

togglelike(post:string){
  return this.http.patch(`${this.ApiBaseUrl}/post/likepost`,{post})
}
savePosts(post:string){
  return this.http.patch(`${this.ApiBaseUrl}/post/savepost`,{post})
}
reportPost(reportData:any){
  return this.http.post(`${this.ApiBaseUrl}/post/reportPost`,reportData)
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
