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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const passport_1 = require("@nestjs/passport");
let AdminController = class AdminController {
    constructor(service) {
        this.service = service;
    }
    signIn(loginCred) {
        return this.service.login(loginCred);
    }
    getMe(req) {
        return this.service.getUsers();
    }
    getReports(req) {
        return this.service.getReports();
    }
    blockUser(userId) {
        return this.service.changeUserStatus(userId);
    }
    blockPost(postId) {
        console.log({ user: postId });
        return this.service.changePostStatus(postId);
    }
    getPosts() {
        return this.service.getPosts();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('admin-jwt')),
    (0, common_1.Get)('allUsers'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('admin-jwt')),
    (0, common_1.Get)('allreports'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getReports", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('admin-jwt')),
    (0, common_1.Patch)('block'),
    __param(0, (0, common_1.Body)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "blockUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('admin-jwt')),
    (0, common_1.Patch)('blockpost'),
    __param(0, (0, common_1.Body)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "blockPost", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('admin-jwt')),
    (0, common_1.Get)('allposts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPosts", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map