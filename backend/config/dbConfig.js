require("dotenv").config();
const dbConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASWWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
};

module.exports = dbConfig;
