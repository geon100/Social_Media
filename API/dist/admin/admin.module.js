"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const admin_schema_1 = require("../schemas/admin.schema");
const passport_1 = require("@nestjs/passport");
const adminJwt_strategy_1 = require("../strategy/adminJwt.strategy");
const user_schema_1 = require("../schemas/user.schema");
const post_schema_1 = require("../schemas/post.schema");
const report_schema_1 = require("../schemas/report.schema");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({
                defaultStrategy: 'admin-jwt',
                property: 'admin',
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Admin', schema: admin_schema_1.AdminSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Post', schema: post_schema_1.PostSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Report', schema: report_schema_1.ReportSchema }])
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, adminJwt_strategy_1.AdJwtStrategy],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map