import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { AppRole } from '../../common/enums/role.enum';
import { RoleName } from '../../../generated/prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto, currentUser: JwtPayload) {
    this.ensureSchoolWriteAccess(currentUser, dto.schoolId);

    const role = await this.prisma.role.findUnique({
      where: { name: RoleName.STUDENT },
    });
    if (!role) {
      throw new ConflictException('STUDENT role missing — run seed');
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

  async findAll(currentUser: JwtPayload) {
    const where =
      currentUser.role === AppRole.SUPER_ADMIN
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

  async findOne(id: string, currentUser: JwtPayload) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        user: { include: { role: true } },
        school: true,
        parent: { include: { user: true } },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    this.ensureSchoolReadAccess(currentUser, student.schoolId);
    return this.formatStudent(student);
  }

  async update(id: string, dto: UpdateStudentDto, currentUser: JwtPayload) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
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

  async remove(id: string, currentUser: JwtPayload) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    this.ensureSchoolWriteAccess(currentUser, student.schoolId);
    await this.prisma.user.delete({ where: { id: student.userId } });
    return { message: 'Student deleted' };
  }

  private ensureSchoolWriteAccess(user: JwtPayload, schoolId: string) {
    if (user.role === AppRole.SUPER_ADMIN || user.role === AppRole.SCHOOL_ADMIN) {
      if (user.role !== AppRole.SUPER_ADMIN && user.schoolId !== schoolId) {
        throw new ForbiddenException('Cannot manage students outside your school');
      }
      return;
    }
    throw new ForbiddenException('Insufficient permissions');
  }

  private ensureSchoolReadAccess(user: JwtPayload, schoolId: string) {
    if (user.role === AppRole.SUPER_ADMIN) return;
    if (user.schoolId !== schoolId) {
      throw new ForbiddenException('Cannot access students outside your school');
    }
  }

  private formatStudent(student: {
    id: string;
    admissionNo: string;
    grade: string | null;
    dateOfBirth: Date | null;
    schoolId: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      isActive: boolean;
    };
    school: { id: string; name: string; code: string };
    parent?: {
      id: string;
      user: { firstName: string; lastName: string; email: string };
    } | null;
    createdAt: Date;
  }) {
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
}
