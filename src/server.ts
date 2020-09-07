import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import 'colors';

import connectDB from './utils/connectDB';
import { ConfigType } from './config/config';
import { GraphQLSchema } from 'graphql';

const startServer = (config: ConfigType, graphqlSchema: GraphQLSchema) => {
  const dbConfig = config.database;

  const db = connectDB(dbConfig.ip, dbConfig.name, dbConfig.port);
  const app = express();
  const server = new ApolloServer({
    schema: graphqlSchema,
    validationRules: [depthLimit(7)],
  });

  if (config.env === 'development') {
    app.use(morgan('dev'));
  }
  app.use('*', cors());
  app.use(compression());
  app.use(express.static(config.staticDir));

  server.applyMiddleware({ app, path: '/graphql' });
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: config.staticDir });
  });

  const httpServer = app.listen(config.port, () =>
    console.log(
      `Server running on http://${config.ip}:${config.port}`.yellow.bold
    )
  );

  return httpServer;
};

export default startServer;
