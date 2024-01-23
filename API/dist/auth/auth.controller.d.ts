import { AuthService } from './auth.service';
import { LoginObj, UserObj } from './auth.dto';
export declare class AuthController {
    private service;
    constructor(service: AuthService);
    signUp(userobj: UserObj, request: Request): Promise<{
        status: boolean;
    }>;
    generateNewAccess(refreshToken: string, request: Request): Promise<{
        token: string;
    }>;
    signIn(loginCred: LoginObj): Promise<{
        token: string;
        refreshToken: string;
    }>;
    otpCreate(email: string): Promise<{
        status: boolean;
    }>;
    resetPassword(newData: any): Promise<{
        status: boolean;
    }>;
}
