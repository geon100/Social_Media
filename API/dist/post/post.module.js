"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const post_schema_1 = require("../schemas/post.schema");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("../schemas/comment.schema");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const user_schema_1 = require("../schemas/user.schema");
const notification_schema_1 = require("../schemas/notification.schema");
const report_schema_1 = require("../schemas/report.schema");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Post', schema: post_schema_1.PostSchema },
                { name: 'Comment', schema: comment_schema_1.CommentSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Notification', schema: notification_schema_1.NotificationSchema },
                { name: 'Report', schema: report_schema_1.ReportSchema },
            ]),
            cloudinary_module_1.CloudinaryModule
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService]
    })
], PostModule);
//# sourceMappingURL=post.module.js.map