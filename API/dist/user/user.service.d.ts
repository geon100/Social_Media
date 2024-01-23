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
import { Post } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
export declare class UserService {
    private postModel;
    private userModel;
    private reportModel;
    private notifyModel;
    constructor(postModel: mongoose.Model<Post>, userModel: mongoose.Model<User>, reportModel: mongoose.Model<Report>, notifyModel: mongoose.Model<Notification>);
    getSuggestions(user: any): Promise<(mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    getFollowers(user: any): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    getUserData(userId: string): Promise<{
        user: mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        };
        posts: Omit<Omit<mongoose.Document<unknown, {}, Post> & Post & {
            _id: mongoose.Types.ObjectId;
        }, never>, never>[];
    }>;
    reportUser(reportData: any, reportedBy: any): Promise<void>;
    followUser(userId: string, loggedinUser: string): Promise<{
        status: boolean;
    }>;
    unfollowUser(userId: string, loggedinUser: string): Promise<{
        status: boolean;
    }>;
    offline(userId: string): Promise<{
        status: boolean;
    }>;
    updateUser(userId: any, obj: any): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    changeCover(id: string, img: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    changeProfile(id: string, img: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    loadNotifications(userId: any): Promise<Omit<Omit<mongoose.Document<unknown, {}, Notification> & Notification & {
        _id: mongoose.Types.ObjectId;
    }, never>, never>[]>;
    readNotifications(userId: string): Promise<mongoose.mongo.DeleteResult>;
}
