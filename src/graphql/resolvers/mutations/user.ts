import { PrismaClient } from '@prisma/client';
import { validate as ValidateUUID } from 'uuid';
import bcrypt from 'bcrypt';
import ValidateUsername from '../../../functions/validateUsername';
import IsEmail from 'validator/lib/isEmail';
import IContext from '../../../types/context';

export const createUser = async (
  _: any,
  {
    input: { username, firstName, lastName, googleId, email, password },
  }: {
    input: {
      username?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      googleId?: string | null;
      email?: string | null;
      password?: string | null;
    };
  }
) => {
  if (typeof email !== 'string' || !IsEmail(email))
    throw new Error('Invalid email');
  if (typeof password !== 'string' || password.length < 8)
    throw new Error('Password must be at least 8 characters');
  if (typeof username !== 'string' || !ValidateUsername(username))
    throw new Error('Invalid username');
  if (typeof firstName !== 'string') throw new Error('Invalid first name');
  else if (firstName.length < 2)
    throw new Error('First name must be at least 2 characters');
  else if (firstName.length > 48)
    throw new Error('First name must be less than 48 characters');
  if (lastName && lastName.length < 2)
    throw new Error('Last name must be at least 2 characters');
  else if (lastName && lastName.length > 48)
    throw new Error('Last name must be less than 48 characters');

  const prisma = new PrismaClient();

  // create user
  const user = await prisma.user.create({
    data: {
      username,
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(
        password,
        parseInt(process.env.HASH_SALT || '10')
      ),
    },
  });
  const session = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  return session.id;
};

export const deleteUser = async (
  _: any,
  { password }: { password?: string | null },
  { logged }: IContext
) => {
  // validate input
  if (logged === null) throw new Error('User must be logged');
  if (typeof password !== 'string') throw new Error('Invalid password');

  const prisma = new PrismaClient();

  // get user from DB
  const user = await prisma.user.findUnique({
    where: {
      id: logged,
    },
  });

  // check if user exists
  if (!user) throw new Error('User not found');

  // check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid password');

  // delete user
  await prisma.user.delete({
    where: {
      id: logged,
    },
  });

  return 'success';
};

export const login = async (
  _: any,
  {
    input: { username, password },
  }: { input: { username?: string | null; password?: string | null } }, {userAgent}:IContext
) => {
  if (typeof password !== 'string' || password.length < 8)
    throw new Error('Password must be at least 8 characters');
  if (typeof username !== 'string' || !ValidateUsername(username))
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
      userAgent
    },
  });
 
  return session.id;
};
