import { PrismaClient } from '@prisma/client';
import { validate as ValidateUUID } from 'uuid';
import ValidateUsername from '../../../functions/validateUsername';

export const user = async (
  _: any,
  { input }: { input: { id?: string | null; username?: string | null } }
) => {
  const { id, username } = input;

  // validation
  if (id && !ValidateUUID(id)) throw new Error('Invalid ID');
  if (username && !ValidateUsername(username))
    throw new Error('Invalid username');
  if (typeof id !== 'string' && typeof username !== 'string')
    throw new Error('Either ID or username must be provided');

  const prisma = new PrismaClient();

  if (id) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  } else if (username) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
};

export const users = async () => {
  const prisma = new PrismaClient();

  return await prisma.user.findMany({});
};
