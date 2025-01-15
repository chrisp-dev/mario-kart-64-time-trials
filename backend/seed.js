const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function main() {
  try {
    for (let i = 0; i < 20; i++) {
      await prisma.timeTrial.create({
        data: {
          date: faker.date.past(),
          track_id: faker.random.number({ min: 1, max: 16 }),
          character: faker.name.firstName(),
          lap1: faker.random.number({ min: 30, max: 60 }) + ':' + faker.random.number({ min: 0, max: 59 }) + ':' + faker.random.number({ min: 0, max: 999 }),
          lap2: faker.random.number({ min: 30, max: 60 }) + ':' + faker.random.number({ min: 0, max: 59 }) + ':' + faker.random.number({ min: 0, max: 999 }),
          lap3: faker.random.number({ min: 30, max: 60 }) + ':' + faker.random.number({ min: 0, max: 59 }) + ':' + faker.random.number({ min: 0, max: 999 }),
          final_time: faker.random.number({ min: 90, max: 180 }) + ':' + faker.random.number({ min: 0, max: 59 }) + ':' + faker.random.number({ min: 0, max: 999 }),
          notes: faker.lorem.sentence(),
        },
      });
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
