// Placeholder for database seeding script

import prisma from '../index';

async function main() {
  // Create Users
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        username: 'admin',
        password: 'password',
        role: 'ADMIN',
      },
      {
        email: 'instructor@example.com',
        username: 'instructor1',
        password: 'password',
        role: 'INSTRUCTOR',
      },
      {
        email: 'team1@example.com',
        username: 'team1',
        password: 'password',
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