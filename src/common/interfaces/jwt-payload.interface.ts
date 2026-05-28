import { Request } from 'express';
import { AppRole } from '../enums/role.enum';

/** Shape of the authenticated user attached to each request after JWT validation */
export interface JwtPayload {
  sub: string;
  email: string;
  role: AppRole;
  schoolId?: string | null;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
