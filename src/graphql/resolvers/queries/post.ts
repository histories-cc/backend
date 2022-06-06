import { PrismaClient } from '@prisma/client';
import { validate as ValidateUUID } from 'uuid';
import ValidateUsername from '../../../functions/validateUsername';

export const post = async (
  _: any,
  { input }: { input: { id?: string | null } }
) => {
  const { id } = input;

  // validation
  if (typeof id !== 'string' || (typeof id === 'string' &&!ValidateUUID(id)))
    throw new Error('Invalid ID');

  const prisma = new PrismaClient();

  if (id) {
    return prisma.post.findUnique({
      where: {
        id,
      },
    });
  }
};

export const posts = async () => {
  const prisma = new PrismaClient();

  console.log(await prisma.user.findMany());

  return await prisma.post.findMany();
};
