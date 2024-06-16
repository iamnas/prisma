import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creating UserPreferences
  const preference1 = await prisma.userPreference.create({
    data: {
      emailUpdates: true,
    },
  });

  const preference2 = await prisma.userPreference.create({
    data: {
      emailUpdates: false,
    },
  });

  // Creating Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      age: 30,
      email: 'alice@example.com',
      role: 'ADMIN',
      userPreference: {
        connect: { id: preference1.id },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      age: 25,
      email: 'bob@example.com',
      role: 'BASIC',
      userPreference: {
        connect: { id: preference2.id },
      },
    },
  });

  // Creating Categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Technology',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Health',
    },
  });

  // Creating Posts
  const post1 = await prisma.post.create({
    data: {
      title: 'The future of AI',
      averageRating: 4.5,
      author: {
        connect: { id: user1.id },
      },
      categories: {
        connect: { id: category1.id },
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Healthy Living Tips',
      averageRating: 4.7,
      author: {
        connect: { id: user2.id },
      },
      categories: {
        connect: { id: category2.id },
      },
    },
  });

  // Adding favorite posts for users
  await prisma.user.update({
    where: { id: user1.id },
    data: {
      favoritePost: {
        connect: { id: post2.id },
      },
    },
  });

  await prisma.user.update({
    where: { id: user2.id },
    data: {
      favoritePost: {
        connect: { id: post1.id },
      },
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
