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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("@nestjs/platform-express/multer");
const multer_2 = require("multer");
const path = require("path");
const post_service_1 = require("./post.service");
const passport_1 = require("@nestjs/passport");
const fs = require("fs");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let PostController = class PostController {
    constructor(service, cloud) {
        this.service = service;
        this.cloud = cloud;
    }
    async uploadFile(body, file, req) {
        if (!file)
            throw new common_1.BadRequestException('Missing required parameter - file');
        try {
            let tags = [];
            let collaborator = '';
            const img = await this.cloud.upload(file);
            if (body.taggedUsers)
                tags = body.taggedUsers;
            if (body.collaborator)
                collaborator = body.collaborator;
            const res = this.service.addpost(req.user._id, body.caption, img, tags, collaborator);
            fs.unlinkSync(file.path);
            return res;
        }
        catch (error) {
            console.error('Error handling file upload:', error);
            throw new common_1.InternalServerErrorException('Failed to process file upload');
        }
    }
    getPosts(req, page = 1) {
        const limit = 5;
        return this.service.loadPosts(page, limit);
    }
    getHomePosts(req, page = 1) {
        const limit = 5;
        return this.service.loadHomePosts(req.user, page, limit);
    }
    toggleLike(req, post) {
        return this.service.likePost(post, req.user._id);
    }
    toggleSave(req, post) {
        return this.service.savePost(post, req.user._id);
    }
    reportUser(req, reportData) {
        return this.service.reportPost(reportData, req.user._id);
    }
    addComment(req, commentObj) {
        const { comment, postId } = commentObj;
        const userId = req.user._id;
        return this.service.addComment(comment, postId, userId);
    }
    deleteComment(req, commentObj) {
        const { commentId, postId } = commentObj;
        const userId = req.user._id;
        return this.service.deleteComment(postId, commentId);
    }
    getUser(req, params) {
        return this.service.getPost(params.id);
    }
    acceptCollab(req, postId) {
        return this.service.acceptCollaborator(postId);
    }
    rejectCollab(req, postId) {
        return this.service.acceptCollaborator(postId);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)('addpost'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('image', {
        storage: (0, multer_2.diskStorage)({
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('getUserPosts'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPosts", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('getHomeUserPosts'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getHomePosts", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('likepost'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "toggleLike", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('savepost'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "toggleSave", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('reportPost'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "reportUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('addcomment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "addComment", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('delcomment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('getPost/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('acceptCollab'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "acceptCollab", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('rejectCollab'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "rejectCollab", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('api/post'),
    __metadata("design:paramtypes", [post_service_1.PostService, cloudinary_service_1.CloudinaryService])
], PostController);
//# sourceMappingURL=post.controller.js.map