import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function storeList(myList) {
  const serializedList = JSON.stringify(myList);
  const result = await prisma.   .create({
    data: {
      data: serializedList,
    },
  });

  return result;
}

const myList = [1, 2, 3];
storeList(myList)
  .then((result) => {
    console.log('List stored:', result);
  })
  .finally(() => {
    prisma.$disconnect();
  });
