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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(userModel, jwt) {
        this.userModel = userModel;
        this.jwt = jwt;
        this.otpStorage = {};
    }
    async signup(obj) {
        const hashed = await argon.hash(obj.password);
        const otpDoc = this.otpStorage[obj.email];
        if (!obj.otp || !otpDoc || otpDoc !== obj.otp) {
            throw new common_1.BadRequestException('invalid OTP');
        }
        try {
            const newUser = (await this.userModel.create({
                fullName: obj.fullName,
                userName: obj.userName,
                email: obj.email,
                password: hashed,
                dob: new Date(obj.dob)
            })).toObject();
            delete newUser.password;
            return { status: true };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Username or email already exists');
            }
            throw error;
        }
    }
    async login(obj) {
        const user = await this.userModel.findOne({ email: obj.email });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (!user.isActive)
            throw new common_1.ForbiddenException('Blocked User');
        const pwMatch = await argon.verify(user.password, obj.password);
        if (!pwMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return { token: await this.signToken(user._id, user.email), refreshToken: await this.signRefreshToken(user._id, user.email) };
    }
    async generateNewAccessToken(token) {
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            console.log('called', decoded);
            return { token: await this.signToken(decoded.sub, decoded.email) };
        }
        catch (error) {
            console.error('Token verification failed:', error.message);
            throw new Error('Invalid refresh token');
        }
    }
    signToken(userId, email) {
        const payload = {
            sub: userId,
            email
        };
        return this.jwt.signAsync(payload, {
            expiresIn: '30 min',
            secret: process.env.JWT_SECRET
        });
    }
    signRefreshToken(userId, email) {
        const payload = {
            sub: userId,
            email
        };
        return this.jwt.signAsync(payload, {
            expiresIn: '1 day',
            secret: process.env.JWT_SECRET
        });
    }
    async generateOtp(email) {
        try {
            const otp = Math.floor(1000 + Math.random() * 9000);
            this.otpStorage[email] = String(otp);
            console.log('otp', this.otpStorage[email]);
            setTimeout(() => {
                console.log('deleted', this.otpStorage[email]);
                delete this.otpStorage[email];
            }, 30 * 1000);
            return otp;
        }
        catch (error) {
            throw error;
        }
    }
    async sendMail(otp, email) {
        const nodemailer = require('nodemailer');
        console.log(process.env.MAIL);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }
        });
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}`,
        };
        await transporter.sendMail(mailOptions);
    }
    async reset(newObj) {
        const { email, otp, newPassword } = newObj;
        try {
            const otpDoc = this.otpStorage[email];
            if (!otp || !otpDoc || otpDoc !== otp) {
                throw new common_1.BadRequestException('invalid OTP');
            }
            const user = await this.userModel.findOne({ email });
            const hashed = await argon.hash(newPassword);
            user.password = hashed;
            await user.save();
            return { status: true };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose.Model, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map