const env = process.env.NODE_ENV || 'development';

if (env == 'development' || env == 'test') {
  let config = require('./config.json');
  config = config[env];
  Object.keys(config).forEach((key) => {
    process.env[key] = config[key];
  })
}