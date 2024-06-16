# Prisma Setup

## Step 1: Initialize a new Node.js project

```bash
npm init -y
```

## Step 2: Install necessary dependencies

```bash
npm install --save-dev prisma typescript ts-node @types/node nodemon
```

## Step 3: Initialize Prisma with PostgreSQL as the datasource

```bash
npx prisma init --datasource-provider postgresql
```

## Step 4: Create the initial migration

```bash
npx prisma migrate dev --name init
```

## Step 5: Install the Prisma client

```bash
npm install @prisma/client
```

## Additional Commands

### To format the Prisma schema

```bash
npx prisma format
```

### To create a new migration

```bash
npx prisma migrate dev --name <migration_name>
```

## Setting Up Models

### One-to-Many Relationship (User-Post)

Define the one-to-many relationship between User and Post in your Prisma schema:

```prisma
model User {
  id           String    @id @default(uuid())
  name         String
  age          Int
  email        String    @unique
  role         Role      @default(BASIC)
  writtenPost  Post[]    @relation("WrittenPosts")
  favoritePost Post[]    @relation("FavoritePosts")
  userPreference   UserPreference? @relation(fields: [userPreferenceId], references: [id])
  userPreferenceId String?         @unique
  @@unique([age, name])
  @@index([email])
}

model Post {
  id            String    @id @default(uuid())
  title         String
  averageRating Float
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  author        User      @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId      String
  favoriteBy    User?     @relation("FavoritePosts", fields: [favoriteId], references: [id])
  favoriteId    String?
  categories    Category[]
}

model UserPreference {
  id           String   @id @default(uuid())
  emailUpdates Boolean
  user         User?
}

model Category {
  id    String  @id @default(uuid())
  name  String  @unique
  posts Post[]
}

enum Role {
  BASIC
  ADMIN
}
```

## Many-to-Many Relationship (Category-Post)

Define the many-to-many relationship between Category and Post in your Prisma schema.

## One-to-One Relationship

Ensure the one-to-one relationship between User and UserPreference in your Prisma schema as defined above.

## Seeding the Database

Create a `seed.ts` file in the `prisma` directory:

```typescript
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
```

### Running the Seed Script

Add a `seed` command to your `package.json` file:

```json
{
  "scripts": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Run the seed script:

```bash
npm run seed
```