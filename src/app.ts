import 'colors';

import loadConfig from './utils/loadConfig';
import startServer from './server';
import generateGraphQLSchema from './utils/generateGraphQLSchema';
import {
  typeDef as Project,
  resolvers as projectResolvers,
} from './models/Project';
import {
  typeDef as User,
  resolvers as userResolvers,
} from './models/User';
import {
  typeDef as BlogPost,
  resolvers as blogPostResolvers,
} from './models/BlogPost';

const config = loadConfig();

const typeDefs = [Project, User, BlogPost];
const resolvers = [projectResolvers, userResolvers, blogPostResolvers];
const graphqlSchema = generateGraphQLSchema(typeDefs, resolvers);

const server = startServer(config, graphqlSchema);

process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err}`.red);
  server.close(() => process.exit(1));
});
