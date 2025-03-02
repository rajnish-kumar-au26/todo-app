require("dotenv").config();

const dbConfig = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres123",
    database: process.env.DB_DATABASE || "todo_app",
    host:
      process.env.DB_HOST ||
      "database-2.cezsmmgawy0x.us-east-1.rds.amazonaws.com",
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = dbConfig;
