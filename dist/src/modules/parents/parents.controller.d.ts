import { ParentsService } from './parents.service';
import { CreateParentDto, UpdateParentDto } from './dto/parent.dto';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class ParentsController {
    private parentsService;
    constructor(parentsService: ParentsService);
    create(dto: CreateParentDto, user: JwtPayload): Promise<{
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
    findAll(user: JwtPayload): Promise<{
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
    findOne(id: string, user: JwtPayload): Promise<{
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
    update(id: string, dto: UpdateParentDto, user: JwtPayload): Promise<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
