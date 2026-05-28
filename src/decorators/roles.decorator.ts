import { SetMetadata } from '@nestjs/common';
import { AppRole } from '../common/enums/role.enum';

export const ROLES_KEY = 'roles';

/** Declarative RBAC — use on controllers/handlers with RolesGuard */
export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
