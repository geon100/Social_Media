import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessage, ChatRoom } from '../models/all.interface';

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
    return this.http.get<ChatRoom[]>(`${this.ApiBaseUrl}/load`)
  }

  loadmessages(chatId:string){
    return this.http.get<ChatMessage[]>(`${this.ApiBaseUrl}/messages/${chatId}`)
  }
  readMessage(messageIds:string[]){
    return this.http.patch(`${this.ApiBaseUrl}/readMessage`,{messageIds})
  }

  sendMessage(chatId:string,textMessage:string){
    return this.http.post<ChatMessage>(`${this.ApiBaseUrl}/send`,{chatId,textMessage})
  }

  sendImage(form:FormData){
    return this.http.post<ChatMessage>(`${this.ApiBaseUrl}/sendImage`,form)
  }
  sendAudio(form:FormData){
    return this.http.post<ChatMessage>(`${this.ApiBaseUrl}/sendAudio`,form)
  }

  sendPost(postId:string,chatIds:string[]){
    return this.http.post<ChatMessage>(`${this.ApiBaseUrl}/sendPost`,{postId,chatIds})
  }
  

  
  
}
