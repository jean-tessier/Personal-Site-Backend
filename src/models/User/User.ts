import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['public', 'family', 'admin'],
    default: 'public',
    required: true
  }
});

interface IUserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  role: string;
};

const User = mongoose.model<IUserDocument>('User', schema);

export { schema as UserSchema, User, IUserDocument };
