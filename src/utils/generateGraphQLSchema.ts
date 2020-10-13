import { IResolvers, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';

const defaultBaseQuery = `
    type Query {
        _empty: String
    }
    type Mutation {
      _empty: String
    }
`;

const defaultBaseResolvers = {};

const generateGraphQLSchema = (
  typeDefs: string[],
  resolvers: IResolvers[],
  baseQuery: string = defaultBaseQuery,
  baseResolvers: IResolvers = defaultBaseResolvers
) => {
  typeDefs = [defaultBaseQuery].concat(...typeDefs);
  resolvers = merge(defaultBaseResolvers, ...resolvers);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return schema;
};

export default generateGraphQLSchema;
