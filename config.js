const fs = require('fs');

module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  database: {
    user: process.env.DB_USER || "",
    host: process.env.DB_HOST || "",
    database: process.env.DB_NAME || "",
    password: process.env.DB_PASSWORD || "",
    port: process.env.DB_PORT || 5432,
    ssl: {
      rejectUnauthorized: process.env.DB_SSL || false,
      ca: process.env.DB_SERVER_CERTIFICATE ? fs.readFileSync(process.env.DB_SERVER_CERTIFICATE).toString() : '',
    },
  },
};
