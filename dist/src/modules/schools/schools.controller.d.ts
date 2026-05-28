import { SchoolsService } from './schools.service';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class SchoolsController {
    private schoolsService;
    constructor(schoolsService: SchoolsService);
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
    findAll(user: JwtPayload): Promise<{
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
    findOne(id: string, user: JwtPayload): Promise<{
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
    update(id: string, dto: UpdateSchoolDto, user: JwtPayload): Promise<{
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
