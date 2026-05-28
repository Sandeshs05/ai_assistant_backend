import type { JwtPayload } from '../interfaces/jwt-payload.interface';
export declare function resolveSchoolScope(user: JwtPayload, requestedSchoolId?: string): string | undefined;
export declare function assertSchoolAccess(user: JwtPayload, resourceSchoolId: string): void;
