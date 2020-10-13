import { BlogPost, IBlogPostDocument } from '.';
import { User } from '../User';
import { Model } from 'mongoose';
import { isAuthorized } from '../../utils/authorization';

export const typeDef = `
extend type Query {
  blogPosts: [BlogPost!]
}

extend type Mutation {
  pushBlogPost(newBlogPost: BlogPostInput!): Boolean!
}

type BlogPost {
  title: String!
  content: String!
  visibility: String!
  author: User!
}

input BlogPostInput {
  title: String!
  content: String!
  visibility: BlogPostVisibility
}

enum BlogPostVisibility {
  PUBLIC
  PRIVATE
  HIDDEN
}
`;

interface IPushBlogPostArgs {
  newBlogPost: IBlogPostDocument,
};

export const resolvers = {
  BlogPostVisibility: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    HIDDEN: 'hidden'
  },
  Query: {
    blogPosts: async () => {
      var blogPosts = await BlogPost.find().populate('author');

      return blogPosts;
    },
  },
  Mutation: {
    pushBlogPost: async (_: null, args: IPushBlogPostArgs, context: any) => {
      const newBlogPost = args.newBlogPost;
      const user = await User.findById(context.userId);

      if (!user)
      {
        throw new Error('Not logged in');
      }

      if (!isAuthorized(user, ['admin']))
      {
        throw new Error('User is not authorized to push blog posts');
      }

      const createdBlogPost = await BlogPost.create({
        title: newBlogPost.title,
        content: newBlogPost.content,
        visibility: newBlogPost.visibility,
        author: user.id,
      });

      return !!createdBlogPost;
    }
  },
};
