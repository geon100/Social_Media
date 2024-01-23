import { OnModuleInit } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

const options: CorsOptions = {
  origin: ["http://localhost:4200",'https://nexus.geobabu.online'],
  methods: ["GET", "POST"],
  credentials: true
};

@WebSocketGateway({ cors: options })
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    // console.log("http://localhost:4200"===process.env.CORS)

    this.server.on('connection', (socket) => {});
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('onMessage', {
      content: body,
    });
  }
}
