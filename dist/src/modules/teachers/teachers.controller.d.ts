import { TeachersService } from './teachers.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class TeachersController {
    private teachersService;
    constructor(teachersService: TeachersService);
    create(dto: CreateTeacherDto, user: JwtPayload): Promise<{
        id: string;
        employeeId: string;
        department: string | null;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    findAll(user: JwtPayload): Promise<{
        id: string;
        employeeId: string;
        department: string | null;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    findOne(id: string, user: JwtPayload): Promise<{
        id: string;
        employeeId: string;
        department: string | null;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateTeacherDto, user: JwtPayload): Promise<{
        id: string;
        employeeId: string;
        department: string | null;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
