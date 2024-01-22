// socket.service.ts

import { Injectable } from '@angular/core';
import { Observable, Subject, connect } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatMessage } from '../models/all.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor() { 
    

    
  }
  initializeSocket(){
    this.socket = io(environment.apiUrl)
    // this.socket.on('connect', () => {
    //   alert('connect')
    // });

    // this.socket.on('disconnect', () => {
      //   alert('disconnect')
      // });
    }
    
    private _onBothUsersReady = new Subject<void>();
  // private _onConnect = new Subject<void>();
  // private _onDisconnect = new Subject<void>();

  // onConnect(): Observable<void> {
  //   return this._onConnect.asObservable();
  // }

  // onDisconnect(): Observable<void> {
  //   return this._onDisconnect.asObservable();
  // }

  sendMessage(message: ChatMessage, chatId: string): void {
    this.socket.emit('newMessage', { message, chatId });
  }

 
  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('onMessage', (data: any) => {
        observer.next(data);
      });
    });
  }

 
  // disconnect(): void {
  //   this.socket.disconnect()
  // }
}
