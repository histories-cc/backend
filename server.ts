import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './src/graphql/typeDefs';
import resolvers from './src/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      myProperty: true,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
