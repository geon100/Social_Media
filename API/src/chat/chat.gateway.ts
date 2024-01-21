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
    const useridToSocketIdMap = new Map<string, string>();
    const socketIdToUseridMap = new Map<string, string>();

    this.server.on('connection', (socket) => {});
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('onMessage', {
      content: body,
    });
  }
}
