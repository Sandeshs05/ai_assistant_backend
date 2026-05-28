import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { AppRole } from '../../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(currentUser: JwtPayload) {
    const where =
      currentUser.role === AppRole.SUPER_ADMIN
        ? {}
        : { schoolId: currentUser.schoolId ?? undefined };

    const users = await this.prisma.user.findMany({
      where,
      include: { role: true, school: true },
      orderBy: { createdAt: 'desc' },
    });

    return users.map((u) => this.sanitize(u));
  }

  async findOne(id: string, currentUser: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true, school: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.ensureAccess(currentUser, user.schoolId);
    return this.sanitize(user);
  }

  async update(id: string, dto: UpdateUserDto, currentUser: JwtPayload) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.ensureAccess(currentUser, user.schoolId);

    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
      include: { role: true, school: true },
    });

    return this.sanitize(updated);
  }

  async remove(id: string, currentUser: JwtPayload) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.ensureAccess(currentUser, user.schoolId);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }

  private ensureAccess(currentUser: JwtPayload, targetSchoolId: string | null) {
    if (currentUser.role === AppRole.SUPER_ADMIN) return;
    if (currentUser.schoolId !== targetSchoolId) {
      throw new ForbiddenException('Cannot access users outside your school');
    }
  }

  private sanitize(user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    schoolId: string | null;
    role: { name: string };
    school?: { id: string; name: string } | null;
    createdAt: Date;
  }) {
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
}
