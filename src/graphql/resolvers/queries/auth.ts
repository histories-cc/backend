import { PrismaClient } from '@prisma/client';
import IContext from '../../../types/context';
import { validate as IsUUID } from 'uuid';

export const sessions = async (_: any, __: any, { logged }: IContext) => {
  if (logged === null) throw new Error('User must be logged');

  const prisma = new PrismaClient();

  return await prisma.session.findMany({
    where: {
      userId: logged,
    },
  });
};

export const session = async (
  _: any,
  { id }: { id?: string | null },
  { logged }: IContext
) => {
  // validate
  if (logged === null) throw new Error('User must be logged');
  if (typeof id !== 'string' || !IsUUID(id)) throw new Error('Invalid ID');

  const prisma = new PrismaClient();

  return await prisma.session.findUnique({
    where: {
      id,
    },
  });
};

export const me = async (_: any, __: any, { logged }: IContext) => {
  if (logged === null) throw new Error('User must be logged');

  const prisma = new PrismaClient();

  return await prisma.user.findUnique({
    where: {
      id: logged,
    },
    include: {
      posts: true,
      profileRel: true,
    },
  });
};
