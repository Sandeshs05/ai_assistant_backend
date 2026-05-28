"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const role_enum_1 = require("../../common/enums/role.enum");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(currentUser) {
        const where = currentUser.role === role_enum_1.AppRole.SUPER_ADMIN
            ? {}
            : { schoolId: currentUser.schoolId ?? undefined };
        const users = await this.prisma.user.findMany({
            where,
            include: { role: true, school: true },
            orderBy: { createdAt: 'desc' },
        });
        return users.map((u) => this.sanitize(u));
    }
    async findOne(id, currentUser) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { role: true, school: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        this.ensureAccess(currentUser, user.schoolId);
        return this.sanitize(user);
    }
    async update(id, dto, currentUser) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        this.ensureAccess(currentUser, user.schoolId);
        const updated = await this.prisma.user.update({
            where: { id },
            data: dto,
            include: { role: true, school: true },
        });
        return this.sanitize(updated);
    }
    async remove(id, currentUser) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        this.ensureAccess(currentUser, user.schoolId);
        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted' };
    }
    ensureAccess(currentUser, targetSchoolId) {
        if (currentUser.role === role_enum_1.AppRole.SUPER_ADMIN)
            return;
        if (currentUser.schoolId !== targetSchoolId) {
            throw new common_1.ForbiddenException('Cannot access users outside your school');
        }
    }
    sanitize(user) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            role: user.role.name,
            schoolId: user.schoolId,
            schoolName: user.school?.name ?? null,
            createdAt: user.createdAt,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map