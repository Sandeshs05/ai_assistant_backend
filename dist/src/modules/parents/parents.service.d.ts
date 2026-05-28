import { PrismaService } from '../../prisma/prisma.service';
import { CreateParentDto, UpdateParentDto } from './dto/parent.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class ParentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateParentDto, currentUser: JwtPayload): Promise<{
        id: string;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        childrenCount: number;
        children: {
            id: string;
            admissionNo: string;
            name: string;
        }[];
        createdAt: Date;
    }>;
    findAll(currentUser: JwtPayload): Promise<{
        id: string;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        childrenCount: number;
        children: {
            id: string;
            admissionNo: string;
            name: string;
        }[];
        createdAt: Date;
    }[]>;
    findOne(id: string, currentUser: JwtPayload): Promise<{
        id: string;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        childrenCount: number;
        children: {
            id: string;
            admissionNo: string;
            name: string;
        }[];
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateParentDto, currentUser: JwtPayload): Promise<{
        id: string;
        schoolId: string;
        schoolName: string;
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        childrenCount: number;
        children: {
            id: string;
            admissionNo: string;
            name: string;
        }[];
        createdAt: Date;
    }>;
    remove(id: string, currentUser: JwtPayload): Promise<{
        message: string;
    }>;
    private ensureSchoolWriteAccess;
    private ensureSchoolReadAccess;
    private formatParent;
}
