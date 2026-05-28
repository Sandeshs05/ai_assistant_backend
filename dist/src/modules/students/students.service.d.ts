import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class StudentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateStudentDto, currentUser: JwtPayload): Promise<{
        id: string;
        admissionNo: string;
        grade: string | null;
        dateOfBirth: Date | null;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        parent: {
            id: string;
            name: string;
            email: string;
        } | null;
        createdAt: Date;
    }>;
    findAll(currentUser: JwtPayload): Promise<{
        id: string;
        admissionNo: string;
        grade: string | null;
        dateOfBirth: Date | null;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        parent: {
            id: string;
            name: string;
            email: string;
        } | null;
        createdAt: Date;
    }[]>;
    findOne(id: string, currentUser: JwtPayload): Promise<{
        id: string;
        admissionNo: string;
        grade: string | null;
        dateOfBirth: Date | null;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        parent: {
            id: string;
            name: string;
            email: string;
        } | null;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateStudentDto, currentUser: JwtPayload): Promise<{
        id: string;
        admissionNo: string;
        grade: string | null;
        dateOfBirth: Date | null;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        parent: {
            id: string;
            name: string;
            email: string;
        } | null;
        createdAt: Date;
    }>;
    remove(id: string, currentUser: JwtPayload): Promise<{
        message: string;
    }>;
    private ensureSchoolWriteAccess;
    private ensureSchoolReadAccess;
    private formatStudent;
}
