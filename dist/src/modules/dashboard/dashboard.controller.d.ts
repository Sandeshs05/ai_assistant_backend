import { DashboardService } from './dashboard.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(user: JwtPayload): Promise<{
        schools: number;
        students: number;
        teachers: number;
        parents: number;
        users: number;
        role: import("../../common/enums/role.enum").AppRole;
        schoolId: string | null | undefined;
    }>;
}
