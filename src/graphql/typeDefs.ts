import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime

  type Query {
    hello: String

    user(input: UserInput!): User
    users: [User]
  }

  interface IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input UserInput {
    id: ID
    username: String
  }

  type User implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    firstName: String!
    lastName: String
    username: String!
    verified: Boolean
    isAdmin: Boolean
  }

  type Me implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    firstName: String!
    lastName: String
    username: String!
  }
`;

export default typeDefs;
