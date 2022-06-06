import { user, users } from './queries/user';
import { post, posts } from './queries/post';
import { place, places } from './queries/place';
import { picture } from './queries/picture';

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
};

export default resolvers;
