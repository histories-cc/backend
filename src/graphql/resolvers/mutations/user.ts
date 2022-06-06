import { PrismaClient } from '@prisma/client';
import { validate as ValidateUUID } from 'uuid';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import ValidateUsername from '../../../functions/validateUsername';

export const createUser = async (
  _: any,
  {
    input,
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
  const { username, firstName, lastName, googleId, email, password } = input;

  if (typeof email !== 'string' || !isEmail(email))
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
  await prisma.user.create({
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
  return 'success';
};

export const deleteUser = async (
  _: any,
  { input }: { input: { id?: string | null; password?: string | null } }
) => {
  const { id, password } = input;

  // validate input
  if (typeof id !== 'string' || (typeof id === 'string' && !ValidateUUID(id)))
    throw new Error('Invalid ID');
  if (typeof password !== 'string') throw new Error('Invalid password');

  const prisma = new PrismaClient();

  // get user from DB
  const user = await prisma.user.findUnique({
    where: {
      id,
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
      id,
    },
  });

  return 'success';
};
