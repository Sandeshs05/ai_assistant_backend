import { UsersService } from './users.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(user: JwtPayload): Promise<{
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
    findOne(id: string, user: JwtPayload): Promise<{
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
    update(id: string, dto: UpdateUserDto, user: JwtPayload): Promise<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
