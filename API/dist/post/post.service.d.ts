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
import { Comment } from 'src/schemas/comment.schema';
import { Post } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
export declare class PostService {
    private postModel;
    private userModel;
    private reportModel;
    private notifyModel;
    private CommentModel;
    constructor(postModel: mongoose.Model<Post>, userModel: mongoose.Model<User>, reportModel: mongoose.Model<Report>, notifyModel: mongoose.Model<Notification>, CommentModel: mongoose.Model<Comment>);
    loadPosts(page: number, limit: number): Promise<Omit<Omit<mongoose.Document<unknown, {}, Post> & Post & {
        _id: mongoose.Types.ObjectId;
    }, never>, never>[]>;
    loadHomePosts(user: any, page: number, limit: number): Promise<Omit<Omit<mongoose.Document<unknown, {}, Post> & Post & {
        _id: mongoose.Types.ObjectId;
    }, never>, never>[]>;
    addpost(userId: mongoose.Schema.Types.ObjectId, caption: string, img: string, tags: string[], collaborator: string): Promise<{
        status: boolean;
    }>;
    likePost(postId: string, userId: string): Promise<mongoose.Document<unknown, {}, Post> & Post & {
        _id: mongoose.Types.ObjectId;
    }>;
    reportPost(reportData: {
        postId: string;
        reportText: string;
        type: string;
    }, reportedBy: any): Promise<void>;
    savePost(postId: string, userId: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    addComment(commentStr: string, postId: string, userId: any): Promise<mongoose.Document<unknown, {}, Comment> & Comment & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteComment(postId: any, commentId: any): Promise<{
        status: boolean;
    }>;
    getPost(postId: any): Promise<mongoose.Document<unknown, {}, Post> & Post & {
        _id: mongoose.Types.ObjectId;
    }>;
    acceptCollaborator(postId: string): Promise<{
        status: boolean;
    }>;
    rejectCollab(postId: string): Promise<void>;
}
