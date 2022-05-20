// *************************************************************************************** IMPORT(S)

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const db = require("../config/index");
const userRoutes = require("../routes/user_routes");
const postRoutes = require("../routes/post_routes");
require("dotenv").config({ path: "../back/config/config.env" });

// ******************************************************************************* APP (APPLICATION)

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet.permittedCrossDomainPolicies());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

db.sequelize.sync();

// ******************************************************************************** ROUTE HANDLER(S)

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

// *************************************************************************************** EXPORT(S)

module.exports = app;
