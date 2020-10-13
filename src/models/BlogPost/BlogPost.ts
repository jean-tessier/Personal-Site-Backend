import mongoose from 'mongoose';
import { UserSchema, User, IUserDocument } from '../User';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    enum: ['public', 'protected', 'private'],
    default: 'private',
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

interface IBlogPostDocument extends mongoose.Document {
  title: string;
  content: string;
  visibility: 'public' | 'protected' | 'private';
  author: string | IUserDocument,
};

const BlogPost = mongoose.model<IBlogPostDocument>('BlogPost', schema);

export { BlogPost, IBlogPostDocument };
