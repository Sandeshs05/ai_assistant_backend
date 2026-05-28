import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { AppRole } from '../../common/enums/role.enum';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSchoolDto) {
    const exists = await this.prisma.school.findUnique({
      where: { code: dto.code },
    });
    if (exists) {
      throw new ConflictException('School code already exists');
    }

    return this.prisma.school.create({ data: dto });
  }

  async findAll(currentUser: JwtPayload) {
    if (currentUser.role === AppRole.SUPER_ADMIN) {
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

  async findOne(id: string, currentUser: JwtPayload) {
    const school = await this.prisma.school.findUnique({ where: { id } });
    if (!school) {
      throw new NotFoundException('School not found');
    }

    if (
      currentUser.role !== AppRole.SUPER_ADMIN &&
      currentUser.schoolId !== id
    ) {
      throw new ForbiddenException('Cannot access this school');
    }

    return school;
  }

  async update(id: string, dto: UpdateSchoolDto, currentUser: JwtPayload) {
    await this.findOne(id, currentUser);
    return this.prisma.school.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.school.delete({ where: { id } });
    return { message: 'School deleted' };
  }
}
