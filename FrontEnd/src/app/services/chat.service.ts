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

  sendMessage(chatId:string,textMessage:string){
    return this.http.post(`${this.ApiBaseUrl}/send`,{chatId,textMessage})
  }
  
  
}
