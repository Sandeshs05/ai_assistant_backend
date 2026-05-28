import { PrismaService } from '../../prisma/prisma.service';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class SchoolsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateSchoolDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        isActive: boolean;
        code: string;
        address: string | null;
        phone: string | null;
    }>;
    findAll(currentUser: JwtPayload): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        isActive: boolean;
        code: string;
        address: string | null;
        phone: string | null;
    }[]>;
    findOne(id: string, currentUser: JwtPayload): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        isActive: boolean;
        code: string;
        address: string | null;
        phone: string | null;
    }>;
    update(id: string, dto: UpdateSchoolDto, currentUser: JwtPayload): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        isActive: boolean;
        code: string;
        address: string | null;
        phone: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
