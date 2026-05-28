"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../prisma/prisma.service");
const role_enum_1 = require("../../common/enums/role.enum");
const client_1 = require("../../../generated/prisma/client");
let ParentsService = class ParentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, currentUser) {
        this.ensureSchoolWriteAccess(currentUser, dto.schoolId);
        const role = await this.prisma.role.findUnique({
            where: { name: client_1.RoleName.PARENT },
        });
        if (!role) {
            throw new common_1.ConflictException('PARENT role missing — run seed');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const parent = await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: dto.email,
                    password: passwordHash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    roleId: role.id,
                    schoolId: dto.schoolId,
                },
            });
            return tx.parent.create({
                data: {
                    userId: user.id,
                    schoolId: dto.schoolId,
                },
                include: {
                    user: { include: { role: true } },
                    school: true,
                    students: { include: { user: true } },
                },
            });
        });
        return this.formatParent(parent);
    }
    async findAll(currentUser) {
        const where = currentUser.role === role_enum_1.AppRole.SUPER_ADMIN
            ? {}
            : { schoolId: currentUser.schoolId ?? undefined };
        const parents = await this.prisma.parent.findMany({
            where,
            include: {
                user: { include: { role: true } },
                school: true,
                students: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return parents.map((p) => this.formatParent(p));
    }
    async findOne(id, currentUser) {
        const parent = await this.prisma.parent.findUnique({
            where: { id },
            include: {
                user: { include: { role: true } },
                school: true,
                students: { include: { user: true } },
            },
        });
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        this.ensureSchoolReadAccess(currentUser, parent.schoolId);
        return this.formatParent(parent);
    }
    async update(id, dto, currentUser) {
        const parent = await this.prisma.parent.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        this.ensureSchoolWriteAccess(currentUser, parent.schoolId);
        const updated = await this.prisma.$transaction(async (tx) => {
            if (dto.firstName || dto.lastName) {
                await tx.user.update({
                    where: { id: parent.userId },
                    data: {
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    },
                });
            }
            return tx.parent.findUniqueOrThrow({
                where: { id },
                include: {
                    user: { include: { role: true } },
                    school: true,
                    students: { include: { user: true } },
                },
            });
        });
        return this.formatParent(updated);
    }
    async remove(id, currentUser) {
        const parent = await this.prisma.parent.findUnique({ where: { id } });
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        this.ensureSchoolWriteAccess(currentUser, parent.schoolId);
        await this.prisma.user.delete({ where: { id: parent.userId } });
        return { message: 'Parent deleted' };
    }
    ensureSchoolWriteAccess(user, schoolId) {
        if (user.role === role_enum_1.AppRole.SUPER_ADMIN || user.role === role_enum_1.AppRole.SCHOOL_ADMIN) {
            if (user.role !== role_enum_1.AppRole.SUPER_ADMIN && user.schoolId !== schoolId) {
                throw new common_1.ForbiddenException('Cannot manage parents outside your school');
            }
            return;
        }
        throw new common_1.ForbiddenException('Insufficient permissions');
    }
    ensureSchoolReadAccess(user, schoolId) {
        if (user.role === role_enum_1.AppRole.SUPER_ADMIN)
            return;
        if (user.schoolId !== schoolId) {
            throw new common_1.ForbiddenException('Cannot access parents outside your school');
        }
    }
    formatParent(parent) {
        return {
            id: parent.id,
            schoolId: parent.schoolId,
            schoolName: parent.school.name,
            userId: parent.user.id,
            email: parent.user.email,
            firstName: parent.user.firstName,
            lastName: parent.user.lastName,
            isActive: parent.user.isActive,
            childrenCount: parent.students.length,
            children: parent.students.map((s) => ({
                id: s.id,
                admissionNo: s.admissionNo,
                name: `${s.user.firstName} ${s.user.lastName}`,
            })),
            createdAt: parent.createdAt,
        };
    }
};
exports.ParentsService = ParentsService;
exports.ParentsService = ParentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParentsService);
//# sourceMappingURL=parents.service.js.map