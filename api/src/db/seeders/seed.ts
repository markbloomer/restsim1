// Placeholder for database seeding script

import prisma from '../index';
import bcrypt from 'bcrypt';

async function main() {
  // Hash passwords
  const password = await bcrypt.hash('password', 10);

  // Create Users
  const [admin, instructor, teamUser] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        username: 'admin',
        password,
        role: 'ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'instructor@example.com' },
      update: {},
      create: {
        email: 'instructor@example.com',
        username: 'instructor1',
        password,
        role: 'INSTRUCTOR',
      },
    }),
    prisma.user.upsert({
      where: { email: 'team1@example.com' },
      update: {},
      create: {
        email: 'team1@example.com',
        username: 'team1',
        password,
        role: 'TEAM',
      },
    }),
  ]);

  // Create Restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'The Bistro',
      background: 'A cozy place for simulation.',
      balanceSheet: { assets: 10000, liabilities: 5000 },
    },
  });

  // Create Market
  const market = await prisma.market.create({
    data: {
      customerRevenue: 2000,
      inflation: 2.5,
      depreciation: 1.2,
      staffTurnover: 0.1,
      season: 'Spring',
      events: { event: 'None' },
    },
  });

  // Create Simulation
  const simulation = await prisma.simulation.create({
    data: {
      name: 'Demo Simulation',
      ownerId: admin.id,
      restaurantId: restaurant.id,
      marketId: market.id,
    },
  });

  // Create Teams
  await prisma.team.createMany({
    data: [
      {
        name: 'Team A',
        password,
        simulationId: simulation.id,
        userId: teamUser.id,
      },
      {
        name: 'Team B',
        password,
        simulationId: simulation.id,
        userId: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seeded users, simulation, teams, restaurant, and market!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });