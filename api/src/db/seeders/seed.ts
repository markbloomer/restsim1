// Placeholder for database seeding script

import prisma from '../index';
import bcrypt from 'bcrypt';

async function main() {
  // Hash passwords
  const password = await bcrypt.hash('password', 10);

  // Create Users
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        username: 'admin',
        password,
        role: 'ADMIN',
      },
      {
        email: 'instructor@example.com',
        username: 'instructor1',
        password,
        role: 'INSTRUCTOR',
      },
      {
        email: 'team1@example.com',
        username: 'team1',
        password,
        role: 'TEAM',
      },
    ],
    skipDuplicates: true,
  });
  console.log('Seeded users!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });