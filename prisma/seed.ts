import { PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import { readFileSync } from 'fs';

async function main() {
  await prisma.user.deleteMany({}); // Erase users table, not done in production
  await prisma.product.deleteMany({}); // Erase users table, not done in production

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
}

async function seedProducts() {
  const products = JSON.parse(
    readFileSync(`${__dirname}/products.json`, 'utf8')
  );
  for (let product of products) {
    const { type, ...data } = product;
    await prisma.product.create({ data });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
