// socket.service.ts

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() { 
    this.socket = io('http://localhost:3000');

    // this.socket.on('connect', () => {
    //   this._onConnect.next();
    // });

    // this.socket.on('disconnect', () => {
    //   this._onDisconnect.next();
    // });
  }

  // private _onConnect = new Subject<void>();
  // private _onDisconnect = new Subject<void>();

  // onConnect(): Observable<void> {
  //   return this._onConnect.asObservable();
  // }

  // onDisconnect(): Observable<void> {
  //   return this._onDisconnect.asObservable();
  // }

  sendMessage(message: any, chatId: string): void {
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
