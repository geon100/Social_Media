"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_controller_1 = require("./chat.controller");
const mongoose_1 = require("@nestjs/mongoose");
const chatRoom_schema_1 = require("../schemas/chatRoom.schema");
const user_schema_1 = require("../schemas/user.schema");
const chat_service_1 = require("./chat.service");
const message_schema_1 = require("../schemas/message.schema");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const post_schema_1 = require("../schemas/post.schema");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Chat', schema: chatRoom_schema_1.ChatSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Message', schema: message_schema_1.MessageSchema },
                { name: 'post', schema: post_schema_1.PostSchema },
            ]), cloudinary_module_1.CloudinaryModule
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService]
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map