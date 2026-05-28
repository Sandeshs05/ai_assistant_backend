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
exports.SchoolsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const role_enum_1 = require("../../common/enums/role.enum");
let SchoolsService = class SchoolsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const exists = await this.prisma.school.findUnique({
            where: { code: dto.code },
        });
        if (exists) {
            throw new common_1.ConflictException('School code already exists');
        }
        return this.prisma.school.create({ data: dto });
    }
    async findAll(currentUser) {
        if (currentUser.role === role_enum_1.AppRole.SUPER_ADMIN) {
            return this.prisma.school.findMany({ orderBy: { name: 'asc' } });
        }
        if (!currentUser.schoolId) {
            return [];
        }
        const school = await this.prisma.school.findUnique({
            where: { id: currentUser.schoolId },
        });
        return school ? [school] : [];
    }
    async findOne(id, currentUser) {
        const school = await this.prisma.school.findUnique({ where: { id } });
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        if (currentUser.role !== role_enum_1.AppRole.SUPER_ADMIN &&
            currentUser.schoolId !== id) {
            throw new common_1.ForbiddenException('Cannot access this school');
        }
        return school;
    }
    async update(id, dto, currentUser) {
        await this.findOne(id, currentUser);
        return this.prisma.school.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.prisma.school.delete({ where: { id } });
        return { message: 'School deleted' };
    }
};
exports.SchoolsService = SchoolsService;
exports.SchoolsService = SchoolsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchoolsService);
//# sourceMappingURL=schools.service.js.map