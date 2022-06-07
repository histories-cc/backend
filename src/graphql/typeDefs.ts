import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime

  type Query {
    hello: String

    # auth
    me: Me
    session: Session!
    sessions: [Session!]!

    # user
    user(input: UserInput!): User
    users: [User]

    # post
    post(id: String!): Post
    posts: [Post!]!

    # place
    place(id: String!): Place
    places: [Place!]!

    # collection
    collection(id: String!): Collection
    collections: [Collection!]!

    # picture
    picture(id: String): Picture
  }

  type Mutation {
    # auth
    login(input: LoginInput!): String
    deleteSession(id: String!): String
    deleteAllSessions(id: String!): String

    # user
    createUser(input: CreateUserInput!): String
    deleteUser(password: String!): String
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

  type Session implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    userId: String!
    userAgent: String
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
    email: String!
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

  type Collection implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    name: String
    description: String
    authorId: ID!
    author: User!

    posts: [Post!]!
  }

  type Comment implements IEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    content: String!
    authorId: ID!
    author: User!

    postId: ID
    post: Post

    commentId: ID
    comment: Comment
  }

  input LoginInput {
    username: String!
    password: String!
  }
`;

export default typeDefs;
