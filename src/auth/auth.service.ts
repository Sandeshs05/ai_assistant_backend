import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AppRole } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true, school: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id, user.email, user.role.name as AppRole, user.schoolId);

    return {
      accessToken: token,
      user: this.sanitizeUser(user),
    };
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const role = await this.prisma.role.findUnique({
      where: { name: dto.role },
    });
    if (!role) {
      throw new ConflictException(`Role ${dto.role} not found — run seed first`);
    }

    if (dto.role !== AppRole.SUPER_ADMIN && !dto.schoolId) {
      throw new ConflictException('schoolId is required for non-super-admin users');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        roleId: role.id,
        schoolId: dto.schoolId ?? null,
      },
      include: { role: true, school: true },
    });

    const token = this.signToken(user.id, user.email, user.role.name as AppRole, user.schoolId);

    return {
      accessToken: token,
      user: this.sanitizeUser(user),
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true, school: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.sanitizeUser(user);
  }

  private signToken(
    userId: string,
    email: string,
    role: AppRole,
    schoolId: string | null,
  ) {
    return this.jwtService.sign({
      sub: userId,
      email,
      role,
      schoolId,
    });
  }

  private sanitizeUser(user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    schoolId: string | null;
    role: { name: string };
    school?: { id: string; name: string; code: string } | null;
  }) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      role: user.role.name,
      schoolId: user.schoolId,
      school: user.school
        ? { id: user.school.id, name: user.school.name, code: user.school.code }
        : null,
    };
  }
}
