import { PrismaClient } from '@prisma/client';
import IContext from '../../../types/context';
import { validate as IsUUID } from 'uuid';

// CREATE POST
export const createPost = async (
  _: any,
  { input: { description } }: { input: { description: string } },
  { logged }: IContext
) => {
  // validate input
  if (logged === null) throw new Error('User must be logged');

  const prisma = new PrismaClient();

  const post = await prisma.post.create({
    data: {
      authorId: logged,
      description,
    },
  });

  return 'success';
};

// DELETE POST
export const deletePost = async (
  _: any,
  { id }: { id?: string | null },
  { logged }: IContext
) => {
  // validate input
  if (logged === null) throw new Error('User must be logged');
  if (typeof id !== 'string' || !IsUUID(id)) throw new Error('Invalid ID');

  const prisma = new PrismaClient();

  const post = await prisma.post.deleteMany({
    where: {
      AND: [{ id }, { authorId: logged }],
    },
  });
  if (post.count === 0) throw new Error('Error when deleting');

  return 'success';
};
