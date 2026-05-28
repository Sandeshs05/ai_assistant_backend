import { Request } from 'express';
import { AppRole } from '../enums/role.enum';
export interface JwtPayload {
    sub: string;
    email: string;
    role: AppRole;
    schoolId?: string | null;
}
export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}
