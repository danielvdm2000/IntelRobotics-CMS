const { parse } = require('pg-connection-string');

const DATABASE_URL = "postgresql://doadmin:5xc7RoIqQl5Iloys@intel-robotics-db-do-user-10017906-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require";

module.exports = ({ env }) => {
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