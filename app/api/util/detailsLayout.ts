import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export async function setDetailsLayout(myList: string) {
//   const result = await prisma.detailsLayout.create({
//     data: {
//       layout: myList,
//     },
//   });

//   return result;
// }

export async function getDetailsLayout(idArg: number = 1) {
  const result = await prisma.detailsLayout.findUnique({
    where: {
      id: idArg,
    },
    select: {
      layout: true,
    },
  });
  return result;
}
export async function updateDetailsLayout(
  detailsLayout: string,
  idArg: number = 1
) {
  const result = await prisma.detailsLayout.upsert({
    where: {
      id: idArg,
    },
    create: {
      layout: detailsLayout,
    },
    update: {
      layout: detailsLayout,
    },
  });
  return result;
}
