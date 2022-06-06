import { user, users } from './queries/user';
import { post, posts } from './queries/post';
import { place, places } from './queries/place';
import { picture } from './queries/picture';

import { createUser, deleteUser } from './mutations/user';

const resolvers = {
  Query: {
    hello: () => 'Hello world!',

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
    // user
    createUser,
    deleteUser,
  },
};

export default resolvers;
