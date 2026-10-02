import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning existing data...');
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  console.log('Creating tenants...');
  const tenant1 = await prisma.tenant.create({
    data: { name: 'Tech Solutions' },
  });

  await prisma.tenant.create({
    data: { name: 'Marketing Pro' },
  });

  console.log('Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  await prisma.user.create({
    data: {
      email: 'admin@techsolutions.com',
      name: 'Admin Tech Solutions',
      password: hashedPassword,
      role: 'ADMIN',
      tenantId: tenant1.id,
    },
  });

  console.log('Seed finalizado correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });