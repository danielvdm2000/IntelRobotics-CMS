const { parse } = require('pg-connection-string');

const DATABASE_URL = process.env.DATABASE_URL;

module.exports = () => {
  const config = parse(DATABASE_URL);

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: config.host,
          port: config.port,
          database: config.database,
          username: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: false,
          },
        },
        options: {},
      },
    },
  };
};