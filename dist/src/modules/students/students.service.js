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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../prisma/prisma.service");
const role_enum_1 = require("../../common/enums/role.enum");
const client_1 = require("../../../generated/prisma/client");
let StudentsService = class StudentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, currentUser) {
        this.ensureSchoolWriteAccess(currentUser, dto.schoolId);
        const role = await this.prisma.role.findUnique({
            where: { name: client_1.RoleName.STUDENT },
        });
        if (!role) {
            throw new common_1.ConflictException('STUDENT role missing — run seed');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const student = await this.prisma.$transaction(async (tx) => {
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
            return tx.student.create({
                data: {
                    admissionNo: dto.admissionNo,
                    grade: dto.grade,
                    dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
                    userId: user.id,
                    schoolId: dto.schoolId,
                    parentId: dto.parentId,
                },
                include: {
                    user: { include: { role: true } },
                    school: true,
                    parent: { include: { user: true } },
                },
            });
        });
        return this.formatStudent(student);
    }
    async findAll(currentUser) {
        const where = currentUser.role === role_enum_1.AppRole.SUPER_ADMIN
            ? {}
            : { schoolId: currentUser.schoolId ?? undefined };
        const students = await this.prisma.student.findMany({
            where,
            include: {
                user: { include: { role: true } },
                school: true,
                parent: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return students.map((s) => this.formatStudent(s));
    }
    async findOne(id, currentUser) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            include: {
                user: { include: { role: true } },
                school: true,
                parent: { include: { user: true } },
            },
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        this.ensureSchoolReadAccess(currentUser, student.schoolId);
        return this.formatStudent(student);
    }
    async update(id, dto, currentUser) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        this.ensureSchoolWriteAccess(currentUser, student.schoolId);
        const updated = await this.prisma.$transaction(async (tx) => {
            if (dto.firstName || dto.lastName) {
                await tx.user.update({
                    where: { id: student.userId },
                    data: {
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    },
                });
            }
            return tx.student.update({
                where: { id },
                data: {
                    grade: dto.grade,
                    dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
                    parentId: dto.parentId,
                },
                include: {
                    user: { include: { role: true } },
                    school: true,
                    parent: { include: { user: true } },
                },
            });
        });
        return this.formatStudent(updated);
    }
    async remove(id, currentUser) {
        const student = await this.prisma.student.findUnique({ where: { id } });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        this.ensureSchoolWriteAccess(currentUser, student.schoolId);
        await this.prisma.user.delete({ where: { id: student.userId } });
        return { message: 'Student deleted' };
    }
    ensureSchoolWriteAccess(user, schoolId) {
        if (user.role === role_enum_1.AppRole.SUPER_ADMIN || user.role === role_enum_1.AppRole.SCHOOL_ADMIN) {
            if (user.role !== role_enum_1.AppRole.SUPER_ADMIN && user.schoolId !== schoolId) {
                throw new common_1.ForbiddenException('Cannot manage students outside your school');
            }
            return;
        }
        throw new common_1.ForbiddenException('Insufficient permissions');
    }
    ensureSchoolReadAccess(user, schoolId) {
        if (user.role === role_enum_1.AppRole.SUPER_ADMIN)
            return;
        if (user.schoolId !== schoolId) {
            throw new common_1.ForbiddenException('Cannot access students outside your school');
        }
    }
    formatStudent(student) {
        return {
            id: student.id,
            admissionNo: student.admissionNo,
            grade: student.grade,
            dateOfBirth: student.dateOfBirth,
            schoolId: student.schoolId,
            schoolName: student.school.name,
            userId: student.user.id,
            email: student.user.email,
            firstName: student.user.firstName,
            lastName: student.user.lastName,
            isActive: student.user.isActive,
            parent: student.parent
                ? {
                    id: student.parent.id,
                    name: `${student.parent.user.firstName} ${student.parent.user.lastName}`,
                    email: student.parent.user.email,
                }
                : null,
            createdAt: student.createdAt,
        };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map