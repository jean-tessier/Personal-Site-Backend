import convict from 'convict';
// @ts-ignore
import convict_format_with_validator from 'convict-format-with-validator';
convict.addFormats(convict_format_with_validator);
import path from 'path';
import dotenv from 'dotenv';

const defaultStaticDir = path.join('client', 'build');

const dotenvResult = dotenv.config({
  path: path.join(__dirname, `env.${!!process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}`),
});
if (!!dotenvResult.error) {
  console.warn(
    `There was an issue loading the .env file: ${dotenvResult.error}`.yellow
  );
}

const configSchema = convict({
  configFile: {
    doc: 'The configuration file to use',
    format: String,
    default: '',
    env: 'CONFIG_FILE',
  },
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to which to bind the server',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to which to bind the server',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
  staticDir: {
    doc:
      'The directory containing the client-side files as it relates to the root directory of the server app',
    format: String,
    default: defaultStaticDir,
    env: 'STATIC_DIR',
  },
  jwt: {
    secret: {
      doc: 'The JWT secret key for JWT token authentication and authorization',
      format: String,
      default: 'my_secret_key',
      env: 'JWT_SECRET', 
    },
    expirySeconds: {
      doc: 'The time in seconds for a JWT before ending the JWT session',
      format: Number,
      default: 300,
      env: 'JWT_EXPIRY_SECONDS',
    },
  },
  database: {
    ip: {
      doc: 'The IP address for the database connection',
      format: String,
      default: '127.0.0.1',
      env: 'DB_ADDRESS',
    },
    port: {
      doc: 'The port for the database connection',
      format: 'port',
      default: undefined,
      env: 'DB_PORT',
    },
    name: {
      doc: 'The db on the mongo server to use',
      format: String,
      default: 'development',
      env: 'DB_NAME',
    },
    user: {
        doc: 'The db user with which to connect to the mongo server',
        format: String,
        env: 'DB_USER',
        default: undefined,
    },
    pass: {
        doc: 'The password for the db user with which to connect to the mongo server',
        format: String,
        env: 'DB_PASS',
        default: undefined,
    },
  },
});

const properties = configSchema.getProperties();
export type ConfigType = typeof properties;

export default configSchema;
