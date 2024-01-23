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
import { PostService } from './post.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class PostController {
    private service;
    private cloud;
    constructor(service: PostService, cloud: CloudinaryService);
    uploadFile(body: {
        collaborator?: string;
        caption: string;
        taggedUsers?: string[];
    }, file: Express.Multer.File, req: any): Promise<{
        status: boolean;
    }>;
    getPosts(req: any, page?: number): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/post.schema").Post> & import("../schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    getHomePosts(req: any, page?: number): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/post.schema").Post> & import("../schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    toggleLike(req: any, post: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/post.schema").Post> & import("../schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    toggleSave(req: any, post: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    reportUser(req: any, reportData: any): Promise<void>;
    addComment(req: any, commentObj: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/comment.schema").Comment> & import("../schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteComment(req: any, commentObj: any): Promise<{
        status: boolean;
    }>;
    getUser(req: any, params: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/post.schema").Post> & import("../schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    acceptCollab(req: any, postId: string): Promise<{
        status: boolean;
    }>;
    rejectCollab(req: any, postId: string): Promise<{
        status: boolean;
    }>;
}
