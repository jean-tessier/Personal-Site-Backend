import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { merge } from 'lodash';

import {
  typeDef as Character,
  resolvers as characterResolvers,
} from './graphql_schema/Character';

const Query = `
  type Query {
    _empty: String
  }
`;

const resolvers = {};

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [Query, Character],
  resolvers: merge(resolvers, characterResolvers),
});

export default schema;
