import { user, users,me } from './queries/user';
import { post, posts } from './queries/post';
import { place, places } from './queries/place';
import { picture } from './queries/picture';

import { createUser, deleteUser, login } from './mutations/user';

const resolvers = {
  Query: {
    hello: () => 'Hello world!',

    // user
    user,
    users,
    me,

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
    // user
    createUser,
    deleteUser,
    login
  },
};

export default resolvers;
