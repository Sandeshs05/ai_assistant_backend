"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSchoolScope = resolveSchoolScope;
exports.assertSchoolAccess = assertSchoolAccess;
const role_enum_1 = require("../enums/role.enum");
function resolveSchoolScope(user, requestedSchoolId) {
    if (user.role === role_enum_1.AppRole.SUPER_ADMIN) {
        return requestedSchoolId;
    }
    return user.schoolId ?? undefined;
}
function assertSchoolAccess(user, resourceSchoolId) {
    if (user.role === role_enum_1.AppRole.SUPER_ADMIN) {
        return;
    }
    if (user.schoolId !== resourceSchoolId) {
        throw new Error('FORBIDDEN_SCHOOL');
    }
}
//# sourceMappingURL=school-scope.util.js.map