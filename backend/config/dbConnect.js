const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("./dbConfig");

const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.username,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    logging: dbConfig.development.logging,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/userSchema")(sequelize, Sequelize);
db.Item = require("../models/itemSchema")(sequelize, Sequelize);

db.User.hasMany(db.Item, { as: "items", foreignKey: "userId" });
db.Item.belongsTo(db.User, { as: "user", foreignKey: "userId" });

module.exports = db;
