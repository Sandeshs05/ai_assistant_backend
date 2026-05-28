import { AppRole } from '../enums/role.enum';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

/** Multi-tenant helper — SUPER_ADMIN bypasses school scoping */
export function resolveSchoolScope(
  user: JwtPayload,
  requestedSchoolId?: string,
): string | undefined {
  if (user.role === AppRole.SUPER_ADMIN) {
    return requestedSchoolId;
  }
  return user.schoolId ?? undefined;
}

export function assertSchoolAccess(user: JwtPayload, resourceSchoolId: string) {
  if (user.role === AppRole.SUPER_ADMIN) {
    return;
  }
  if (user.schoolId !== resourceSchoolId) {
    throw new Error('FORBIDDEN_SCHOOL');
  }
}
