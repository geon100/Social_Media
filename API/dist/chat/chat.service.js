"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ChatService = class ChatService {
    constructor(chatModel, userModel, messageModel) {
        this.chatModel = chatModel;
        this.userModel = userModel;
        this.messageModel = messageModel;
    }
    async createChat(sender, receiver) {
        try {
            const existingChat = await this.chatModel.findOne({ users: { $all: [sender, receiver] } }).exec();
            console.log('here');
            if (!existingChat) {
                console.log('new');
                await this.chatModel.create({
                    users: [sender, receiver],
                });
            }
            else
                console.log('exists');
            return { status: true };
        }
        catch (error) {
            throw error;
        }
    }
    async loadChat(userId) {
        const chats = await this.chatModel.find({ users: userId })
            .select('-users')
            .populate({
            path: 'users',
            select: '_id userName profilePicture isOnline',
        }).exec();
        chats.forEach(chat => {
            chat.users = chat.users.filter(val => val._id.toString() !== userId.toString());
        });
        return chats;
    }
    async loadMessages(chat) {
        return await this.messageModel.find({ chatId: chat })
            .populate({
            path: 'sender',
            select: '_id userName profilePicture',
        }).exec();
    }
    async readStatus(messages) {
        console.log(messages);
        const object_Ids = messages.map((id) => new mongoose_2.default.Types.ObjectId(id));
        await this.messageModel.updateMany({ _id: { $in: object_Ids } }, { $set: { read: true } });
    }
    async sendMessage(chatId, textMessage, userId) {
        const message = await this.messageModel.create({
            sender: userId,
            text: textMessage,
            chatId
        });
        return await message.populate({
            path: 'sender',
            select: '_id userName profilePicture',
        });
    }
    sendPost(chatIds, post, userId) {
        chatIds.forEach(async (chatId) => {
            await this.messageModel.create({
                sender: userId,
                postId: post,
                chatId
            });
        });
        return { status: true };
    }
    async sendImage(chatId, img, userId) {
        const message = await this.messageModel.create({
            sender: userId,
            image: img,
            chatId
        });
        return await message.populate({
            path: 'sender',
            select: '_id userName profilePicture',
        });
    }
    async sendAudio(chatId, audio, userId) {
        const message = await this.messageModel.create({
            sender: userId,
            audio: audio,
            chatId
        });
        return await message.populate({
            path: 'sender',
            select: '_id userName profilePicture',
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Chat')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map