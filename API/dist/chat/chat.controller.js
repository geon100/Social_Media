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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const fs = require("fs");
let ChatController = class ChatController {
    constructor(service, cloud) {
        this.service = service;
        this.cloud = cloud;
    }
    createChat(req, id) {
        return this.service.createChat(req.user._id, id);
    }
    LoadChats(req, id) {
        return this.service.loadChat(req.user._id);
    }
    getMessages(req, params) {
        return this.service.loadMessages(params.id);
    }
    readMessage(req, messageIds) {
        return this.service.readStatus(messageIds);
    }
    sendMessage(req, obj) {
        const { chatId, textMessage } = obj;
        return this.service.sendMessage(chatId, textMessage, req.user._id);
    }
    sendPost(req, obj) {
        const { postId, chatIds } = obj;
        return this.service.sendPost(chatIds, postId, req.user._id);
    }
    async uploadFile(chatId, file, req) {
        if (!file)
            throw new common_1.BadRequestException('Missing required parameter - file');
        console.log('img chat');
        const img = await this.cloud.upload(file);
        const res = this.service.sendImage(chatId, img, req.user._id);
        console.log('img chat');
        fs.unlinkSync(file.path);
        return res;
    }
    async uploadAudio(chatId, file, req) {
        console.log(file);
        if (!file)
            throw new common_1.BadRequestException('Missing required parameter - file');
        const audio = await this.cloud.upload(file);
        const res = this.service.sendAudio(chatId, audio, req.user._id);
        fs.unlinkSync(file.path);
        return res;
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('load'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "LoadChats", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('messages/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('readMessage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('messageIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "readMessage", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('sendPost'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendPost", null);
__decorate([
    (0, common_1.Post)('sendImage'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = 'IMG' + '-' + Date.now();
                cb(null, `${filename}${path.extname(file.originalname)}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
                return cb(null, false);
            cb(null, true);
        }
    })),
    __param(0, (0, common_1.Body)('chatId')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('sendAudio'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = 'AUDIO' + '-' + Date.now();
                cb(null, `${filename}${path.extname(file.originalname)}`);
            }
        }),
    })),
    __param(0, (0, common_1.Body)('chatId')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "uploadAudio", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('api/chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService, cloudinary_service_1.CloudinaryService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map