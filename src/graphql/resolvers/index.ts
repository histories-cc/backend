import { PrismaClient } from '@prisma/client';
import { user, users } from './queries/user';
import { post, posts } from './queries/post';

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user,
    users,
    post,
    posts,
  },
};

export default resolvers;
