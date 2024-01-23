/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ChatService } from './chat.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class ChatController {
    private service;
    private cloud;
    constructor(service: ChatService, cloud: CloudinaryService);
    createChat(req: any, id: string): Promise<{
        status: boolean;
    }>;
    LoadChats(req: any, id: string): Promise<import("../schemas/chatRoom.schema").Chat[]>;
    getMessages(req: any, params: any): Promise<Omit<import("mongoose").Document<unknown, {}, import("../schemas/message.schema").Message> & import("../schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    readMessage(req: any, messageIds: string[]): Promise<void>;
    sendMessage(req: any, obj: any): Promise<Omit<import("mongoose").Document<unknown, {}, import("../schemas/message.schema").Message> & import("../schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    sendPost(req: any, obj: any): {
        status: boolean;
    };
    uploadFile(chatId: string, file: Express.Multer.File, req: any): Promise<Omit<import("mongoose").Document<unknown, {}, import("../schemas/message.schema").Message> & import("../schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    uploadAudio(chatId: string, file: Express.Multer.File, req: any): Promise<Omit<import("mongoose").Document<unknown, {}, import("../schemas/message.schema").Message> & import("../schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
