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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PostService = class PostService {
    constructor(postModel, userModel, reportModel, notifyModel, CommentModel) {
        this.postModel = postModel;
        this.userModel = userModel;
        this.reportModel = reportModel;
        this.notifyModel = notifyModel;
        this.CommentModel = CommentModel;
    }
    async loadPosts(page, limit) {
        return await this.postModel.find({ isActive: true }).populate('user collaborator').populate({
            path: 'comments',
            populate: { path: 'user' }
        }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec();
    }
    async loadHomePosts(user, page, limit) {
        const followingIds = user.following.map(followedUser => followedUser.toString());
        return await this.postModel
            .find({
            $or: [
                { user: { $in: followingIds } },
                { collaborator: { $in: followingIds }, collab: true },
            ],
            isActive: true,
        })
            .populate('user collaborator')
            .populate({
            path: 'comments',
            populate: { path: 'user' }
        })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }
    async addpost(userId, caption, img, tags, collaborator) {
        try {
            const newPost = await this.postModel.create({
                user: userId,
                caption,
                image: img,
            });
            if (tags.length) {
                newPost.tags = tags.map((tag) => new mongoose_2.default.Types.ObjectId(tag));
                await newPost.save();
                for (const tag of newPost.tags) {
                    await this.notifyModel.create({
                        sender: userId,
                        receiver: tag,
                        type: 'tag',
                        post: newPost._id
                    });
                }
            }
            if (collaborator) {
                newPost.collaborator = new mongoose_2.default.Types.ObjectId(collaborator);
                await newPost.save();
                await this.notifyModel.create({
                    sender: userId,
                    receiver: newPost.collaborator,
                    type: 'collab',
                    post: newPost._id
                });
            }
            return { status: true };
        }
        catch (error) {
            console.error('Error adding post:', error);
            throw error;
        }
    }
    async likePost(postId, userId) {
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        const user_Id = new mongoose_2.default.Types.ObjectId(userId);
        if (post.likes.some((likeId) => likeId.toString() === user_Id.toString())) {
            post.likes = post.likes.filter((likeId) => likeId.toString() !== user_Id.toString());
        }
        else {
            post.likes.push(user_Id);
            if (user_Id.toString() !== post.user.toString()) {
                await this.notifyModel.create({
                    sender: userId,
                    receiver: post.user,
                    type: 'like'
                });
            }
            if (post.collab && user_Id.toString() !== post.collaborator.toString()) {
                console.log('Inside if condition for collaboration notification');
                console.log('user_Id.toString():', user_Id.toString());
                console.log('post.collaborator.toString():', post.collaborator.toString());
                await this.notifyModel.create({
                    sender: userId,
                    receiver: post.collaborator,
                    type: 'like'
                });
            }
        }
        return await post.save();
    }
    async reportPost(reportData, reportedBy) {
        console.log(reportData, reportedBy);
        const existingReport = await this.reportModel.findOne({
            reportedBy: reportedBy,
            reportedPost: reportData.postId
        });
        if (!existingReport) {
            await this.reportModel.create({
                reportedBy: reportedBy,
                reportedPost: reportData.postId,
                text: reportData.reportText,
                type: reportData.type
            });
            const reportedPost = await this.postModel.findById(reportData.postId);
            reportedPost.reportCount++;
            if (reportedPost.reportCount > 15) {
                reportedPost.isActive = false;
            }
            await reportedPost.save();
        }
    }
    async savePost(postId, userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const post_Id = new mongoose_2.default.Types.ObjectId(postId);
        if (user.saved.some((savedId) => savedId.toString() === post_Id.toString())) {
            user.saved = user.saved.filter((savedId) => savedId.toString() !== post_Id.toString());
        }
        else {
            user.saved.push(post_Id);
        }
        return await user.save();
    }
    async addComment(commentStr, postId, userId) {
        if (!commentStr || !postId) {
            throw new common_1.BadRequestException('Not valid data');
        }
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        const comment = await this.CommentModel.create({
            user: userId,
            text: commentStr
        });
        await comment.populate('user');
        post.comments.push(comment._id);
        await post.save();
        return comment;
    }
    async deleteComment(postId, commentId) {
        const post = await this.postModel.findById(postId);
        post.comments = post.comments.filter(val => val.toString() !== commentId);
        await this.CommentModel.deleteOne({ _id: commentId });
        await post.save();
        return { status: true };
    }
    async getPost(postId) {
        return await this.postModel.findOne({ _id: postId, isActive: true }).populate('user collaborator').populate({
            path: 'comments',
            populate: { path: 'user' }
        }).exec();
    }
    async acceptCollaborator(postId) {
        console.log(postId);
        await this.postModel.findByIdAndUpdate(postId, { collab: true }, { new: true });
        await this.notifyModel.deleteOne({ post: postId, type: 'collab' });
        return { status: true };
    }
    async rejectCollab(postId) {
        await this.notifyModel.deleteOne({ post: postId, type: 'collab' });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Report')),
    __param(3, (0, mongoose_1.InjectModel)('Notification')),
    __param(4, (0, mongoose_1.InjectModel)('Comment')),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], PostService);
//# sourceMappingURL=post.service.js.map