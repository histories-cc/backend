import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './src/graphql/typeDefs';
import resolvers from './src/graphql/resolvers';
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from 'graphql-scalars';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const server = new ApolloServer({
  typeDefs: typeDefs ,
  resolvers,
  plugins: [
    // graphql playground
    ApolloServerPluginLandingPageGraphQLPlayground({
      endpoint: '/',
    }),
  ],
  context: async ({ req }) => {
    return {
      myProperty: true,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
