import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { AppRole } from '../../common/enums/role.enum';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(currentUser: JwtPayload): Promise<{
        schools: number;
        students: number;
        teachers: number;
        parents: number;
        users: number;
        role: AppRole;
        schoolId: string | null | undefined;
    }>;
}
