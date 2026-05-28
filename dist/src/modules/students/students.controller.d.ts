import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class StudentsController {
    private studentsService;
    constructor(studentsService: StudentsService);
    create(dto: CreateStudentDto, user: JwtPayload): Promise<{
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
    findAll(user: JwtPayload): Promise<{
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
    findOne(id: string, user: JwtPayload): Promise<{
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
    update(id: string, dto: UpdateStudentDto, user: JwtPayload): Promise<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
