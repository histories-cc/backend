import { PrismaClient } from '@prisma/client';
import { user, users } from './queries/user';

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user,
    users,
  },
};

export default resolvers;
