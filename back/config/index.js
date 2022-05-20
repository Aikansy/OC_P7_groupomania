// *************************************************************************************** IMPORT(S)

const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "../back/config/config.env" });

// ***************************************************************************** CONNECTING MYSQL DB

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user_model")(sequelize, Sequelize);
db.post = require("../models/post_model")(sequelize, Sequelize);
db.comment = require("../models/comment_model")(sequelize, Sequelize);

try {
  sequelize.authenticate();
  console.log("Successful connection to MySQL database !");
} catch (error) {
  console.error("Impossible to connect !", error);
}

module.exports = db;
