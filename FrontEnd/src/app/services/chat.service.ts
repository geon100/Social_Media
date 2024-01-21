import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private ApiBaseUrl = 'http://localhost:3000/chat'
  constructor(private http:HttpClient) { }

  chatOpen(userId:string){
    
    return this.http.post(`${this.ApiBaseUrl}/create`,{userId})
  }

  loadChat(){
    return this.http.get(`${this.ApiBaseUrl}/load`)
  }

  loadmessages(chatId:string){
    return this.http.get(`${this.ApiBaseUrl}/messages/${chatId}`)
  }
  readMessage(messageIds:string[]){
    return this.http.patch(`${this.ApiBaseUrl}/readMessage`,{messageIds})
  }

  sendMessage(chatId:string,textMessage:string){
    return this.http.post(`${this.ApiBaseUrl}/send`,{chatId,textMessage})
  }

  sendImage(form:FormData){
    return this.http.post(`${this.ApiBaseUrl}/sendImage`,form)
  }
  sendAudio(form:FormData){
    return this.http.post(`${this.ApiBaseUrl}/sendAudio`,form)
  }

  sendPost(postId:string,chatIds:string[]){
    return this.http.post(`${this.ApiBaseUrl}/sendPost`,{postId,chatIds})
  }
  

  
  
}
