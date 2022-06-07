import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime

  type Query {
    hello: String

    user(input: UserInput!): User
    users: [User]
    me: Me

    post(id: String): Post
    posts: [Post!]!
    place(id: String): Place
    places: [Place!]!
    picture(id: String): Picture
  }

  type Mutation {
    createUser(input: CreateUserInput!): String
    deleteUser(password: String!): String
    login(input: LoginInput!): String
  }

  input CreateUserInput {
    username: String
    firstName: String
    lastName: String
    googleId: String
    email: String
    password: String
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
    email:String!
    verified: Boolean
    isAdmin: Boolean

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

  type Picture implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    url: String
    alt: String
    blurhash: String
  }

  input LoginInput {
    username: String!
    password: String!
  }
`;

export default typeDefs;
