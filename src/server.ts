import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

import schema from './schema';
import connectDB from './utils/connectDB';
import loadConfig from './utils/loadConfig';
import { ConfigType } from './config/config';

const config = loadConfig();
const dbConfig = config.database;
// TODO: this should be configurable
// const ROOT = path.join(__dirname, 'client', 'build');
const ROOT = config.staticDir;

const db = connectDB(dbConfig.ip, dbConfig.port.toString(), dbConfig.name);

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});

app.use('*', cors());
app.use(compression());
app.use(express.static(ROOT));

server.applyMiddleware({ app, path: '/graphql' });
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: ROOT });
  // res.end('TEST');
});

const httpServer = createServer(app);

httpServer.listen({ port: config.port }, (): void =>
  console.log(
    `\nGraphQL is no running on http://localhost:${config.port}/graphql`
  )
);

const buildServer = (config: ConfigType) => {};
