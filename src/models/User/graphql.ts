import { User, IUserDocument } from '.';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loadConfig from '../../utils/loadConfig';

const config = loadConfig();

export const typeDef = `
extend type Query {
  users: [User!]
  getUserId: String 
  getUserRole: UserRole
}

extend type Mutation {
  register(info: RegisterInput!): AuthPayload
  login(info: LoginInput!): AuthPayload
}

type User {
  name: String!
  email: String!
  role: String!
}

input LoginInput {
  email: String!
  password: String!
}

input RegisterInput {
  name: String!
  email: String!
  password: String!
}

type AuthPayload {
  token: String
  user: User
}

enum UserRole {
  PUBLIC
  FAMILY
  ADMIN
}
`;

interface ILoginArgs {
  info: {
    email: string,
    password: string,
  }
};

interface IRegisterArgs {
  info: {
    name: string,
    email: string,
    password: string
  }
};

export const resolvers = {
  UserRole: {
    PUBLIC: 'public',
    FAMILY: 'family',
    ADMIN: 'admin',
  },
  Query: {
    users: async () => {
      const users = await User.find();

      return users;
    },
    // @ts-ignore
    getUserId: async (parent, args, context, info) => {
      const userId = context.userId;

      return userId;
    },
    // @ts-ignore
    getUserRole: async (parent, args, context, info) => {
      const role = context.role;

      return role;
    }
  },
  Mutation: {
    register: async (_: null, args: IRegisterArgs) => {
      const { info } = args;
      const password = await bcrypt.hash(info.password, 10);

      const user = await User.create({
        password,
        name: info.name,
        email: info.email,
        role: 'public',
      });

      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        config.jwt.secret,
        {
          algorithm: "HS256",
          expiresIn: config.jwt.expirySeconds,
        },
      );

      return {
        token,
        user,
      };
    },
    login: async (_: null, args: ILoginArgs) => {
      const { info } = args;
      const user = await User.findOne({
        email: info.email,
      });
      if (!user)
      {
        throw new Error('Account for email address doesn\'t exist');
      }
      
      const authenticated = await bcrypt.compare(info.password, user.password);
      if (!authenticated)
      {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, config.jwt.secret);

      return {
        token,
        user,
      };
    },
  },
};
