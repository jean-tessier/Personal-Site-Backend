import loadConfig from './utils/loadConfig';
import startServer from './server';
import 'colors';

const config = loadConfig();

const server = startServer(config);

process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err}`.red);
  server.close(() => process.exit(1));
});
