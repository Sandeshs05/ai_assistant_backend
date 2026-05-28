import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { AppRole } from '../../common/enums/role.enum';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  /** Aggregated counts for the dashboard home — scoped by school for non-super-admins */
  async getStats(currentUser: JwtPayload) {
    const schoolFilter =
      currentUser.role === AppRole.SUPER_ADMIN
        ? {}
        : { schoolId: currentUser.schoolId ?? undefined };

    const [schools, students, teachers, parents, users] = await Promise.all([
      currentUser.role === AppRole.SUPER_ADMIN
        ? this.prisma.school.count()
        : this.prisma.school.count({ where: { id: currentUser.schoolId ?? '' } }),
      this.prisma.student.count({ where: schoolFilter }),
      this.prisma.teacher.count({ where: schoolFilter }),
      this.prisma.parent.count({ where: schoolFilter }),
      this.prisma.user.count({ where: schoolFilter }),
    ]);

    return {
      schools,
      students,
      teachers,
      parents,
      users,
      role: currentUser.role,
      schoolId: currentUser.schoolId,
    };
  }
}
