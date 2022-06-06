import { PrismaClient } from '@prisma/client';
import { validate as ValidateUUID } from 'uuid';

export const post = async (
  _: any,
  { input }: { input: { id?: string | null } }
) => {
  const { id } = input;

  // validation
  if (typeof id !== 'string' || (typeof id === 'string' && !ValidateUUID(id)))
    throw new Error('Invalid ID');

  const prisma = new PrismaClient();

  if (id) {
    return prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        place: true,
      },
    });
  }
};

export const posts = async () => {
  const prisma = new PrismaClient();

  return await prisma.post.findMany({
    include: {
      author: true,
      place: true,
    },
  });
};
