import prisma from "@/app/api/util/db";

export async function getDetailsLayout(idArg: number = 1) {
  try {
    const result = await prisma.detailsLayout.findUnique({
      where: {
        id: idArg,
      },
      select: {
        layout: true,
      },
    });
    return result?.layout;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function updateDetailsLayout(
  detailsLayout: string,
  idArg: number = 1
) {
  try {
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
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
