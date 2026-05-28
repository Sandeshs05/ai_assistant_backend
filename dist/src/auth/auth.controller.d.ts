import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { JwtPayload } from '../common/interfaces/jwt-payload.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            isActive: boolean;
            role: string;
            schoolId: string | null;
            school: {
                id: string;
                name: string;
                code: string;
            } | null;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            isActive: boolean;
            role: string;
            schoolId: string | null;
            school: {
                id: string;
                name: string;
                code: string;
            } | null;
        };
    }>;
    me(user: JwtPayload): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        role: string;
        schoolId: string | null;
        school: {
            id: string;
            name: string;
            code: string;
        } | null;
    }>;
}
