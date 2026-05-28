import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { AppRole } from '../../common/enums/role.enum';
import { RoleName } from '../../../generated/prisma/client';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTeacherDto, currentUser: JwtPayload) {
    this.ensureSchoolWriteAccess(currentUser, dto.schoolId);

    const role = await this.prisma.role.findUnique({
      where: { name: RoleName.TEACHER },
    });
    if (!role) {
      throw new ConflictException('TEACHER role missing — run seed');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const teacher = await this.prisma.$transaction(async (tx) => {
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

      return tx.teacher.create({
        data: {
          employeeId: dto.employeeId,
          department: dto.department,
          userId: user.id,
          schoolId: dto.schoolId,
        },
        include: {
          user: { include: { role: true } },
          school: true,
        },
      });
    });

    return this.formatTeacher(teacher);
  }

  async findAll(currentUser: JwtPayload) {
    const where =
      currentUser.role === AppRole.SUPER_ADMIN
        ? {}
        : { schoolId: currentUser.schoolId ?? undefined };

    const teachers = await this.prisma.teacher.findMany({
      where,
      include: {
        user: { include: { role: true } },
        school: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return teachers.map((t) => this.formatTeacher(t));
  }

  async findOne(id: string, currentUser: JwtPayload) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        user: { include: { role: true } },
        school: true,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    this.ensureSchoolReadAccess(currentUser, teacher.schoolId);
    return this.formatTeacher(teacher);
  }

  async update(id: string, dto: UpdateTeacherDto, currentUser: JwtPayload) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    this.ensureSchoolWriteAccess(currentUser, teacher.schoolId);

    const updated = await this.prisma.$transaction(async (tx) => {
      if (dto.firstName || dto.lastName) {
        await tx.user.update({
          where: { id: teacher.userId },
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
          },
        });
      }

      return tx.teacher.update({
        where: { id },
        data: { department: dto.department },
        include: {
          user: { include: { role: true } },
          school: true,
        },
      });
    });

    return this.formatTeacher(updated);
  }

  async remove(id: string, currentUser: JwtPayload) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    this.ensureSchoolWriteAccess(currentUser, teacher.schoolId);
    await this.prisma.user.delete({ where: { id: teacher.userId } });
    return { message: 'Teacher deleted' };
  }

  private ensureSchoolWriteAccess(user: JwtPayload, schoolId: string) {
    if (user.role === AppRole.SUPER_ADMIN || user.role === AppRole.SCHOOL_ADMIN) {
      if (user.role !== AppRole.SUPER_ADMIN && user.schoolId !== schoolId) {
        throw new ForbiddenException('Cannot manage teachers outside your school');
      }
      return;
    }
    throw new ForbiddenException('Insufficient permissions');
  }

  private ensureSchoolReadAccess(user: JwtPayload, schoolId: string) {
    if (user.role === AppRole.SUPER_ADMIN) return;
    if (user.schoolId !== schoolId) {
      throw new ForbiddenException('Cannot access teachers outside your school');
    }
  }

  private formatTeacher(teacher: {
    id: string;
    employeeId: string;
    department: string | null;
    schoolId: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      isActive: boolean;
    };
    school: { id: string; name: string; code: string };
    createdAt: Date;
  }) {
    return {
      id: teacher.id,
      employeeId: teacher.employeeId,
      department: teacher.department,
      schoolId: teacher.schoolId,
      schoolName: teacher.school.name,
      userId: teacher.user.id,
      email: teacher.user.email,
      firstName: teacher.user.firstName,
      lastName: teacher.user.lastName,
      isActive: teacher.user.isActive,
      createdAt: teacher.createdAt,
    };
  }
}
