import { BlogPost, IBlogPostDocument } from '.';
import { User } from '../User';
import { Model } from 'mongoose';

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
  visibility: String
}
`;

interface IPushBlogPostArgs {
  newBlogPost: IBlogPostDocument,
};

export const resolvers = {
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
