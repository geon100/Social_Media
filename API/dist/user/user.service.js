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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dt4zlqomk',
    api_key: '154456853779316',
    api_secret: 'iYVXhNtFtTM1rBtiWJr9s3n6lkc',
    secure: true,
});
let UserService = class UserService {
    constructor(postModel, userModel, reportModel, notifyModel) {
        this.postModel = postModel;
        this.userModel = userModel;
        this.reportModel = reportModel;
        this.notifyModel = notifyModel;
    }
    async getSuggestions(user) {
        const followingIds = user.following.map(followedUser => followedUser.toString());
        followingIds.push(user._id);
        return await this.userModel.find({ _id: { $nin: followingIds } });
    }
    async getFollowers(user) {
        return await await this.userModel.findById(user._id, { followers: 1, _id: 0 }).populate('followers');
    }
    async getUserData(userId) {
        try {
            const user = await this.userModel
                .findById(userId)
                .populate('followers')
                .populate('following')
                .populate({
                path: 'saved',
                populate: {
                    path: 'user',
                },
            });
            const posts = await this.postModel
                .find({ $or: [{ user: userId }, { collaborator: userId, collab: true }], isActive: true })
                .populate('user collaborator')
                .populate({
                path: 'comments',
                populate: { path: 'user' },
            });
            await this.postModel.populate(user.saved, {
                path: 'comments',
                populate: { path: 'user' },
            });
            return { user, posts };
        }
        catch (error) {
            throw error;
        }
    }
    async reportUser(reportData, reportedBy) {
        console.log(reportData, reportedBy);
        const existingReport = await this.reportModel.findOne({
            reportedBy: reportedBy,
            reportedUser: reportData.userId
        });
        if (!existingReport) {
            await this.reportModel.create({
                reportedBy: reportedBy,
                reportedUser: reportData.userId,
                text: reportData.reportText,
                type: reportData.type
            });
            const reportedUser = await this.userModel.findById(reportData.userId);
            reportedUser.reportCount++;
            if (reportedUser.reportCount > 15) {
                reportedUser.isActive = false;
            }
            await reportedUser.save();
        }
    }
    async followUser(userId, loggedinUser) {
        const logUser = await this.userModel.findById(loggedinUser);
        const userToFollow = await this.userModel.findById(userId);
        if (!logUser.following.includes(new mongoose_2.default.Types.ObjectId(userId))) {
            logUser.following.push(new mongoose_2.default.Types.ObjectId(userId));
            await logUser.save();
        }
        if (!userToFollow.followers.includes(logUser._id)) {
            userToFollow.followers.push(logUser._id);
            await userToFollow.save();
        }
        await this.notifyModel.create({
            sender: loggedinUser,
            receiver: userId,
            type: 'follow',
        });
        return { status: true };
    }
    async unfollowUser(userId, loggedinUser) {
        const logUser = await this.userModel.findById(loggedinUser);
        const userToUnfollow = await this.userModel.findById(userId);
        logUser.following = logUser.following.filter(val => val.toString() !== userId);
        await logUser.save();
        userToUnfollow.followers = userToUnfollow.followers.filter(val => val.toString() !== loggedinUser);
        await userToUnfollow.save();
        return { status: true };
    }
    async offline(userId) {
        const user = await this.userModel.findByIdAndUpdate(userId, { isOnline: false }, { new: true });
        return { status: true };
    }
    async updateUser(userId, obj) {
        try {
            const user = await this.userModel.findById(userId);
            user.userName = obj.userName;
            user.fullName = obj.fullName;
            user.bio = obj.bio;
            user.dob = new Date(obj.dob);
            await user.save();
            return await this.userModel.findById(userId)
                .populate('followers')
                .populate('following');
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Username or email already exists');
            }
            throw error;
        }
    }
    async changeCover(id, img) {
        const user = await this.userModel.findById(id);
        user.coverPicture = img;
        return await user.save();
    }
    async changeProfile(id, img) {
        const user = await this.userModel.findById(id);
        user.profilePicture = img;
        return await user.save();
    }
    async loadNotifications(userId) {
        return await this.notifyModel.find({ receiver: userId }).sort({ createdAt: -1 }).populate({
            path: 'sender',
            select: '_id userName profilePicture',
        }).populate({
            path: 'post',
            populate: [
                {
                    path: 'user',
                    model: 'User',
                },
                {
                    path: 'comments',
                    populate: {
                        path: 'user',
                        model: 'User',
                    },
                },
            ],
        }).exec();
    }
    async readNotifications(userId) {
        return await this.notifyModel.deleteMany({ receiver: userId, type: { $ne: 'collab' } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Report')),
    __param(3, (0, mongoose_1.InjectModel)('Notification')),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], UserService);
//# sourceMappingURL=user.service.js.map