import convict from 'convict';
// @ts-ignore
import convict_format_with_validator from 'convict-format-with-validator';
convict.addFormats(convict_format_with_validator);
import path from 'path';

const defaultStaticDir = path.join('client', 'build');

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
  database: {
    ip: {
      doc: 'The IP address for the database connection',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'DB_ADDRESS',
    },
    port: {
      doc: 'The port for the database connection',
      format: 'port',
      default: 27017,
      env: 'DB_PORT',
    },
    name: {
      doc: 'The db on the mongo server to use',
      format: String,
      default: 'development',
    },
  },
});

const properties = configSchema.getProperties();
export type ConfigType = typeof properties;

export default configSchema;
