import 'colors';

import loadConfig from './utils/loadConfig';
import startServer from './server';
import generateGraphQLSchema from './utils/generateGraphQLSchema';
import {
  typeDef as Character,
  resolvers as characterResolvers,
} from './models/Character';
import {
  typeDef as Project,
  resolvers as projectResolvers,
} from './models/Project';

const config = loadConfig();

const typeDefs = [Character, Project];
const resolvers = [characterResolvers, projectResolvers];
const graphqlSchema = generateGraphQLSchema(typeDefs, resolvers);

const server = startServer(config, graphqlSchema);

process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err}`.red);
  server.close(() => process.exit(1));
});
