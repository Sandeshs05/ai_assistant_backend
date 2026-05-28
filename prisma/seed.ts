import { PrismaClient, RoleName } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const ROLES: { name: RoleName; description: string }[] = [
  { name: RoleName.SUPER_ADMIN, description: 'Platform administrator' },
  { name: RoleName.SCHOOL_ADMIN, description: 'School-level administrator' },
  { name: RoleName.TEACHER, description: 'Teaching staff' },
  { name: RoleName.STUDENT, description: 'Enrolled student' },
  { name: RoleName.PARENT, description: 'Parent or guardian' },
];

async function main() {
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }

  const superAdminRole = await prisma.role.findUniqueOrThrow({
    where: { name: RoleName.SUPER_ADMIN },
  });

  const passwordHash = await bcrypt.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@schoolcrm.com' },
    update: {},
    create: {
      email: 'admin@schoolcrm.com',
      password: passwordHash,
      firstName: 'Super',
      lastName: 'Admin',
      roleId: superAdminRole.id,
    },
  });

  console.log('Seed complete. Login: admin@schoolcrm.com / Admin@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
