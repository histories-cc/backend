import { PrismaClient } from '@prisma/client';
import { validate as ValidateUUID } from 'uuid';

export const place = async (
  _: any,
  { input }: { input: { id?: string | null } }
) => {
  const { id } = input;

  // validation
  if (typeof id !== 'string' || (typeof id === 'string' && !ValidateUUID(id)))
    throw new Error('Invalid ID');

  const prisma = new PrismaClient();

  if (id) {
    return prisma.place.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
        previewPicture: true,
      },
    });
  }
};

export const places = async () => {
  const prisma = new PrismaClient();

  return await prisma.place.findMany({
    include: {
      posts: true,
      previewPicture: true,
    },
  });
};
