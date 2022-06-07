import { user, users } from './queries/user';
import { post, posts } from './queries/post';
import { place, places } from './queries/place';
import { picture } from './queries/picture';
import { session, sessions, me } from './queries/auth';

import { createUser, deleteUser } from './mutations/user';
import { deleteAllSessions, deleteSession, login } from './mutations/auth';

const resolvers = {
  Query: {
    hello: () => 'Hello world!',

    // auth
    me,
    session,
    sessions,

    // user
    user,
    users,

    // post
    post,
    posts,

    // place
    place,
    places,

    // picture
    picture,
  },
  Mutation: {
    // auth
    login,
    deleteSession,
    deleteAllSessions,

    // user
    createUser,
    deleteUser,
  },
};

export default resolvers;
