import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    getProfile(userId: string): Promise<{
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
    private signToken;
    private sanitizeUser;
}
