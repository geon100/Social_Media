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
import { JwtService } from '@nestjs/jwt';
import { LoginObj } from 'src/auth/auth.dto';
import * as mongoose from 'mongoose';
import { Admin } from 'src/schemas/admin.schema';
import { User } from 'src/schemas/user.schema';
import { Post } from 'src/schemas/post.schema';
export declare class AdminService {
    private adminModel;
    private userModel;
    private postModel;
    private reportModel;
    private jwt;
    constructor(adminModel: mongoose.Model<Admin>, userModel: mongoose.Model<User>, postModel: mongoose.Model<Post>, reportModel: mongoose.Model<Report>, jwt: JwtService);
    login(obj: LoginObj): Promise<{
        token: string;
    }>;
    private signToken;
    getUsers(): Promise<(mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    changeUserStatus(userId: string): Promise<void>;
    changePostStatus(postId: string): Promise<void>;
    getPosts(): Promise<Omit<mongoose.Document<unknown, {}, Post> & Post & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
    getReports(): Promise<Omit<mongoose.Document<unknown, {}, Report> & Report & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
}
