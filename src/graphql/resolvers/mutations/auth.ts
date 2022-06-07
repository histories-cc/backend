import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import ValidateUsername from '../../../functions/validateUsername';
import IsEmail from 'validator/lib/isEmail';
import IContext from '../../../types/context';
import { validate as IsUUID } from 'uuid';

export const login = async (
  _: any,
  {
    input: { username, password },
  }: { input: { username?: string | null; password?: string | null } },
  { userAgent }: IContext
) => {
  if (typeof password !== 'string' || password.length < 8)
    throw new Error('Password must be at least 8 characters');
  if (
    typeof username !== 'string' ||
    (!ValidateUsername(username) && !IsEmail(username))
  )
    throw new Error('Invalid username');

  const prisma = new PrismaClient();

  const isEmail = IsEmail(username);

  // get user from DB
  const user = await prisma.user.findUnique({
    where: isEmail
      ? { email: username }
      : {
          username,
        },
  });

  // check if user exists
  if (!user) throw new Error('User not found');

  // check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid password');

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent,
    },
  });

  return session.id;
};

export const deleteSession = async (
  _: any,
  { id }: { id?: string | null },
  { logged }: IContext
) => {
  if (logged === null) throw new Error('User must be logged');
  if (typeof id !== 'string' || !IsUUID(id)) throw new Error('Invalid ID');

  const prisma = new PrismaClient();

  const session = await prisma.session.deleteMany({
    where: {
      AND: [{ id }, { userId: logged }],
    },
  });

  if (session.count === 0) throw new Error('Nothing deleted');
  return 'success';
};

export const deleteAllSessions = async (
  _: any,
  __: any,
  { logged }: IContext
) => {
  if (logged === null) throw new Error('User must be logged');

  const prisma = new PrismaClient();

  const session = await prisma.session.deleteMany({
    where: {
      userId: logged,
    },
  });

  if (session.count === 0) throw new Error('Nothing deleted');
  return 'success';
};
