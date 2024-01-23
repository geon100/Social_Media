// socket.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatMessage } from '../models/all.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  initializeSocket(){
    this.socket = io(environment.apiUrl)
    }

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
}
