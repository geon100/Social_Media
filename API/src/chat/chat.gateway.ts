import { OnModuleInit } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

const options: CorsOptions = {
  origin: ["http://localhost:4200"],
  methods: ["GET", "POST"],
  credentials: true
};

@WebSocketGateway({ cors: options })
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    // console.log(body);
    this.server.emit('onMessage', {
      content: body,
    });
  }

  
}


