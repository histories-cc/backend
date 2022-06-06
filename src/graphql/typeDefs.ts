import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime

  type Query {
    hello: String

    user(input: UserInput!): User
    users: [User]
    post(id: String): Post
    posts: [Post!]!
    place(id: String): Place
    places: [Place!]!
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

    posts: [Post!]!
  }

  type Me implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    firstName: String!
    lastName: String
    username: String!

    posts: [Post!]!
  }

  type Post implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    description: String

    authorId: ID!
    author: User!

    placeId: ID
    place: Place
  }

  type Place implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    name: String
    description: String
    address: String
    latitude: Float!
    longitude: Float!

    posts: [Post!]!
  }
`;

export default typeDefs;
