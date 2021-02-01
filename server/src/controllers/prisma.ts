import { IUser } from '@models/User';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUser = async (user: IUser) => {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io'
    }
  });
};
// async function main() {
//   // ... you will write your Prisma Client queries here
// }
// main()
//   .catch(e => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
