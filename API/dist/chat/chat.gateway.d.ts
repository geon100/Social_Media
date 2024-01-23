import { OnModuleInit } from "@nestjs/common";
import { Server } from "socket.io";
export declare class ChatGateway implements OnModuleInit {
    server: Server;
    onModuleInit(): void;
    onNewMessage(body: any): void;
}
