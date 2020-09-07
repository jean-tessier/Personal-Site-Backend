import path from 'path';
import dotenv from 'dotenv';
import 'colors';

import { default as config, ConfigType } from '../config/config';

const selectConfigFile = (configuration: ConfigType) => {
  let configFile = configuration.configFile;
  if (configFile !== '') {
    const configFileFromRoot = path.join(__dirname, '..', '..', configFile);
    configFile = configFileFromRoot;
  } else if (configuration.env === 'development') {
    configFile = path.join(
      __dirname,
      '..',
      'config',
      'development.config.json'
    );
  }

  return configFile;
};

const loadConfig = () => {
  const configFile = selectConfigFile(config.get());
  if (!!configFile) config.loadFile(configFile);

  console.log(config.get());

  config.validate();

  const staticDir = config.get('staticDir');
  config.set('staticDir', path.join(__dirname, '..', '..', staticDir));

  return config.get();
};

export default loadConfig;
