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
import { LoginObj } from 'src/auth/auth.dto';
import { AdminService } from './admin.service';
export declare class AdminController {
    private service;
    constructor(service: AdminService);
    signIn(loginCred: LoginObj): Promise<{
        token: string;
    }>;
    getMe(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getReports(req: any): Promise<Omit<import("mongoose").Document<unknown, {}, Report> & Report & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    blockUser(userId: string): Promise<void>;
    blockPost(postId: string): Promise<void>;
    getPosts(): Promise<Omit<import("mongoose").Document<unknown, {}, import("../schemas/post.schema").Post> & import("../schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
}
