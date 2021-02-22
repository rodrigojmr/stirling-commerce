import { add } from 'date-fns';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import products from './products';

async function main() {
  await prisma.productInOrder.deleteMany({}); // Erase users table, not done in production
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({}); // Erase users table, not done in production
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  const admin = await prisma.user.create({
    data: {
      email: `admin@admin.com`,
      name: 'Alice',
      passHash: bcrypt.hashSync('P@2e&E!c2*PTtnJ#R75J', 10),
      role: 'ADMIN'
    }
  });
  const user = await prisma.user.create({
    data: {
      email: `user@randomuser.com`,
      name: 'Tom',
      passHash: bcrypt.hashSync('P@2e&E!c2*PTtnJ#R75J', 10),
      role: 'USER'
    }
  });
  await seedProducts();

  const products = await prisma.product.findMany({});

  //   const order = await prisma.order.create({
  //     data: {
  //       cost: 200,
  //       userId: user.id,
  //       products: {
  //         create: {
  //           product: {
  //             connect: {
  //               id: products[0].id
  //             }
  //           },
  //           productId: products[0].id,
  //           amount: 2
  //         }
  //         // products.map(product => ({
  //         //   productId: product.id,
  //         //   amount: ensure(
  //         //     req.body.products.find(item => item.product.id === product.id)
  //         //   ).amount
  //         // }))
  //       }
  //     },
  //     include: {
  //       products: true,
  //       buyer: true
  //     }
  //   });
}

async function seedProducts() {
  for (const product of products) {
    const { categories, ...data } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...data,
        categories: {
          connectOrCreate: categories.map(category => ({
            where: { name: category },
            create: { name: category }
          }))
        }
      },
      include: {
        categories: true
      }
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
