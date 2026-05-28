import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(currentUser: JwtPayload): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        role: string;
        schoolId: string | null;
        schoolName: string | null;
        createdAt: Date;
    }[]>;
    findOne(id: string, currentUser: JwtPayload): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        role: string;
        schoolId: string | null;
        schoolName: string | null;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, currentUser: JwtPayload): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        role: string;
        schoolId: string | null;
        schoolName: string | null;
        createdAt: Date;
    }>;
    remove(id: string, currentUser: JwtPayload): Promise<{
        message: string;
    }>;
    private ensureAccess;
    private sanitize;
}
