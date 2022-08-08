import { PrismaClient } from '@prisma/client';
import { validate as IsUUID } from 'uuid';
import ValidateUsername from '../../../functions/validateUsername';
import IContext from '../../../types/context';

export const user = async (
  _: any,
  { input }: { input: { id?: string | null; username?: string | null } }
) => {
  const { id, username } = input;

  // validation
  if (id && !IsUUID(id)) throw new Error('Invalid ID');
  if (username && !ValidateUsername(username))
    throw new Error('Invalid username');
  if (typeof id !== 'string' && typeof username !== 'string')
    throw new Error('Either ID or username must be provided');

  const prisma = new PrismaClient();

  if (id) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  } else if (username) {
    return await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: true,
        profileRel: true,
      },
    });
  }
};

export const users = async () => {
  const prisma = new PrismaClient();

  return await prisma.user.findMany({
    include: {
      posts: true,
      profileRel: true,
    },
  });
};
