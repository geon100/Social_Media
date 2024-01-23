/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from './user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class UserController {
    private service;
    private cloud;
    constructor(service: UserService, cloud: CloudinaryService);
    getSuggestions(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getNotify(req: any): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, Notification> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    readNotify(req: any): Promise<import("mongodb").DeleteResult>;
    getMe(req: any): any;
    offline(req: any): Promise<{
        status: boolean;
    }>;
    userUpdate(req: any, userobj: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUser(req: any, params: any): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        posts: Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/post.schema").Post> & import("../schemas/post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
    }>;
    getfollowers(req: any, params: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    reportUser(req: any, reportData: string): Promise<void>;
    followUser(req: any, id: string): Promise<{
        status: boolean;
    }>;
    unfollowUser(req: any, id: string): Promise<{
        status: boolean;
    }>;
    ChangeCoverPhoto(file: Express.Multer.File, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    ChangeProfilePhoto(file: Express.Multer.File, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
