import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// const prisma = new PrismaClient({log: ["query"]}); // to see the query

// async function main() {
//   // ... you will write your Prisma client queries here

//   // await prisma.userPreference.deleteMany();
//   await prisma.user.deleteMany();

//   // const users = await prisma.user.create({
//   //   data: {
//   //     name: "tezst",
//   //     age: 44,
//   //     email: "tesaat@example.com",
//   //     userPreference: {
//   //       create: {
//   //         emailUpdates: true,
//   //       },
//   //     },
//   //   },
//   //   // include: {
//   //   //   userPreference: true,
//   //   // },
//   //   select: {
//   //     name: true,
//   //     userPreference: { select: { id: true } },
//   //   },
//   // });

//   const users = await prisma.user.createMany({
//     data: [
//       {
//         name: "Kyle",
//         email: "kyle@example.com",
//         age: 44,
//       },
//       {
//         name: "Sally",
//         email: "Sally@example.com",
//         age: 44,
//       },
//       {
//         name: "Sesey",
//         email: "sesey@example.com",
//         age: 44,
//       },
//     ],
//   });
//   //
//   console.log(users);
// }

// main()
//   .catch((e) => {
//     console.error(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// async function get() {
//   // const users = await prisma.user.findUnique({
//   //   where: {
//   //     email: "Sally@example.com",
//   //   },
//   // });

//   // const users = await prisma.user.findMany({
//   //   where: {
//   //     age: 44,
//   //   },
//   //   orderBy: {
//   //     age: "desc",
//   //   },
//   //   distinct: ["name", "age"],
//   //   take: 2,
//   //   skip: 1,
//   // });

//   // const users = await prisma.user.findFirst({
//   //   where: {
//   //     age: 44,
//   //   },
//   // });
//   // const users = await prisma.user.findMany({
//   //   where: {
//   //     // age: { equals: 44 },
//   //     age: { lte: 41 },
//   //   },
//   // });

//   // const users = await prisma.user.findMany({
//   //   where: {
//   //     // name: { contains: "S" },
//   //     name: { startsWith: "S" },
//   //   },
//   // });

//   const users = await prisma.user.findMany({
//     where: {

//       AND: [ {name: { startsWith: "S" }},{name:"Sally"}]

//     },
//   });

//   console.log(users);
// }

// get()
//   .catch((e) => {
//     console.error(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function update() {
  // const users = await prisma.user.update({
  //   where: {
  //     email: "sally@prisma.com",
  //   },
  //   data: {
  //     email: "Sally@example.com",
  //   },

  // });

  const users = await prisma.user.update({
    where: {
      email: "Sally@example.com",
    },
    data: {
      age: {
        multiply: 5
      },
    },

  });

  
  console.log(users);
}

update()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
