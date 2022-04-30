// *************************************************************************************** IMPORT(S)

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// ************************************************************************** CONNECTING TO MYSQL DB

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 1,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// *************************************************************************************** EXPORT(S)

module.exports = db;
