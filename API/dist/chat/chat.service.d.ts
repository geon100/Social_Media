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
/// <reference types="mongoose/types/inferschematype" />
import mongoose from 'mongoose';
import { Chat } from 'src/schemas/chatRoom.schema';
import { Message } from 'src/schemas/message.schema';
import { User } from 'src/schemas/user.schema';
export declare class ChatService {
    private chatModel;
    private userModel;
    private messageModel;
    constructor(chatModel: mongoose.Model<Chat>, userModel: mongoose.Model<User>, messageModel: mongoose.Model<Message>);
    createChat(sender: any, receiver: any): Promise<{
        status: boolean;
    }>;
    loadChat(userId: string): Promise<Chat[]>;
    loadMessages(chat: any): Promise<Omit<mongoose.Document<unknown, {}, Message> & Message & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
    readStatus(messages: string[]): Promise<void>;
    sendMessage(chatId: string, textMessage: string, userId: string): Promise<Omit<mongoose.Document<unknown, {}, Message> & Message & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    sendPost(chatIds: string[], post: string, userId: string): {
        status: boolean;
    };
    sendImage(chatId: string, img: string, userId: any): Promise<Omit<mongoose.Document<unknown, {}, Message> & Message & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    sendAudio(chatId: any, audio: any, userId: any): Promise<Omit<mongoose.Document<unknown, {}, Message> & Message & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
}
