require('dotenv').config();
import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './src/graphql/typeDefs';
import resolvers from './src/graphql/resolvers';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { PrismaClient } from '@prisma/client';
import { validate as IsValidUUID } from 'uuid';

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  plugins: [
    // graphql playground
    ApolloServerPluginLandingPageGraphQLPlayground({
      endpoint: '/',
    }),
  ],
  context: async ({ req }) => {
    // todo: redis
    const sessionId = req.headers.session;
    const userAgent = req.headers['user-agent'];

    if (typeof sessionId === 'string' && !IsValidUUID(sessionId))
      throw new Error('invalid session 0');
    if (typeof sessionId !== 'string' && sessionId !== undefined)
      throw new Error('invalid session 1');
    if (sessionId === undefined) return { logged: null, userAgent };

    const prisma = new PrismaClient();

    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (session === null) throw new Error('invalid session');

    return { logged: session.userId, userAgent };
  },
});

server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
