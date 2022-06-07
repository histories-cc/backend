import { PrismaClient } from '@prisma/client';
import { validate as ValidateUUID } from 'uuid';

export const picture = async (
  _: any,
  { input }: { input: { id?: string | null } }
) => {
  const { id } = input;

  // validation
  if (typeof id !== 'string' || (typeof id === 'string' && !ValidateUUID(id)))
    throw new Error('Invalid ID');

  const prisma = new PrismaClient();

  if (id) {
    return prisma.picture.findUnique({
      where: {
        id,
      },
    });
  }
};
