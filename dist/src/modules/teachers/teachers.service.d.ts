import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class TeachersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTeacherDto, currentUser: JwtPayload): Promise<{
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
    findAll(currentUser: JwtPayload): Promise<{
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
    findOne(id: string, currentUser: JwtPayload): Promise<{
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
    update(id: string, dto: UpdateTeacherDto, currentUser: JwtPayload): Promise<{
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
    remove(id: string, currentUser: JwtPayload): Promise<{
        message: string;
    }>;
    private ensureSchoolWriteAccess;
    private ensureSchoolReadAccess;
    private formatTeacher;
}
