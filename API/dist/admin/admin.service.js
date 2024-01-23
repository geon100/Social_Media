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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let AdminService = class AdminService {
    constructor(adminModel, userModel, postModel, reportModel, jwt) {
        this.adminModel = adminModel;
        this.userModel = userModel;
        this.postModel = postModel;
        this.reportModel = reportModel;
        this.jwt = jwt;
    }
    async login(obj) {
        const adminUser = await this.adminModel.findOne({ email: obj.email });
        if (!adminUser)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const pwMatch = adminUser.password === obj.password;
        if (!pwMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return { token: await this.signToken(adminUser._id, adminUser.email) };
    }
    signToken(adminId, email) {
        const payload = {
            sub: adminId,
            email
        };
        return this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: process.env.JWT_SECRET
        });
    }
    async getUsers() {
        const users = await this.userModel.find();
        return users;
    }
    async changeUserStatus(userId) {
        try {
            const user = await this.userModel.findById(userId);
            if (user) {
                user.isActive = !user.isActive;
                await user.save();
            }
            else {
                console.log(`User with ID ${userId} not found.`);
            }
        }
        catch (error) {
            console.error(`Error changing user status: ${error.message}`);
            throw new Error('Failed to change user status');
        }
    }
    async changePostStatus(postId) {
        try {
            const post = await this.postModel.findById(postId);
            if (post) {
                post.isActive = !post.isActive;
                await post.save();
            }
            else {
                console.log(`post with ID ${postId} not found.`);
            }
        }
        catch (error) {
            console.error(`Error changing post status: ${error.message}`);
            throw new Error('Failed to change post status');
        }
    }
    async getPosts() {
        const posts = await this.postModel.find().populate({ path: 'user', options: { strictPopulate: false } }).exec();
        return posts;
    }
    async getReports() {
        const reports = await this.reportModel
            .find()
            .populate([
            { path: 'reportedUser', options: { strictPopulate: false } },
            { path: 'reportedPost', options: { strictPopulate: false } },
            { path: 'reportedBy', options: { strictPopulate: false } }
        ])
            .exec();
        return reports;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Admin')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Post')),
    __param(3, (0, mongoose_1.InjectModel)('Report')),
    __metadata("design:paramtypes", [mongoose.Model, mongoose.Model, mongoose.Model, mongoose.Model, jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map