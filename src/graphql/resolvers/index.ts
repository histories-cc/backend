import { PrismaClient } from '@prisma/client';

const resolvers = {
  Query: {
    hello: () => 'Hello world!',

    users: async () => {
      const prisma = new PrismaClient();
      return await prisma.user.findMany();
    },
  },
};

export default resolvers;
