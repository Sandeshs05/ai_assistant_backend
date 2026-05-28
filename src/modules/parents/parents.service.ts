import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateParentDto, UpdateParentDto } from './dto/parent.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { AppRole } from '../../common/enums/role.enum';
import { RoleName } from '../../../generated/prisma/client';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateParentDto, currentUser: JwtPayload) {
    this.ensureSchoolWriteAccess(currentUser, dto.schoolId);

    const role = await this.prisma.role.findUnique({
      where: { name: RoleName.PARENT },
    });
    if (!role) {
      throw new ConflictException('PARENT role missing — run seed');
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

  async findAll(currentUser: JwtPayload) {
    const where =
      currentUser.role === AppRole.SUPER_ADMIN
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

  async findOne(id: string, currentUser: JwtPayload) {
    const parent = await this.prisma.parent.findUnique({
      where: { id },
      include: {
        user: { include: { role: true } },
        school: true,
        students: { include: { user: true } },
      },
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    this.ensureSchoolReadAccess(currentUser, parent.schoolId);
    return this.formatParent(parent);
  }

  async update(id: string, dto: UpdateParentDto, currentUser: JwtPayload) {
    const parent = await this.prisma.parent.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
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

  async remove(id: string, currentUser: JwtPayload) {
    const parent = await this.prisma.parent.findUnique({ where: { id } });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    this.ensureSchoolWriteAccess(currentUser, parent.schoolId);
    await this.prisma.user.delete({ where: { id: parent.userId } });
    return { message: 'Parent deleted' };
  }

  private ensureSchoolWriteAccess(user: JwtPayload, schoolId: string) {
    if (user.role === AppRole.SUPER_ADMIN || user.role === AppRole.SCHOOL_ADMIN) {
      if (user.role !== AppRole.SUPER_ADMIN && user.schoolId !== schoolId) {
        throw new ForbiddenException('Cannot manage parents outside your school');
      }
      return;
    }
    throw new ForbiddenException('Insufficient permissions');
  }

  private ensureSchoolReadAccess(user: JwtPayload, schoolId: string) {
    if (user.role === AppRole.SUPER_ADMIN) return;
    if (user.schoolId !== schoolId) {
      throw new ForbiddenException('Cannot access parents outside your school');
    }
  }

  private formatParent(parent: {
    id: string;
    schoolId: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      isActive: boolean;
    };
    school: { id: string; name: string; code: string };
    students: Array<{
      id: string;
      admissionNo: string;
      user: { firstName: string; lastName: string };
    }>;
    createdAt: Date;
  }) {
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
}
