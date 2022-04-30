# 01 - Server initialization

## Install dependencies

    > "npm init" with Entry point: server.js
    > "npm install --save nodemon"
    > "npm install --save express"
    > "npm install --save sequelize"
    > "npm install --save mysql2"
    > "npm install --save dotenv"

## back file(s)/folder(s) creation

back:

    > "touch server.js"
    > "touch .gitignore"
    > "mkdir app"
    > "mkdir config"
    > (app) "touch app.js"
    > (config) "touch .env"

## Configure the server

back/server.js :

```javascript
const http = require("http");
const app = require("./app/app");
require("dotenv").config({ path: "./config/.env" });

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
```

## Configure the app

back/app/app.js:

```javascript
const express = require("express");
const app = express();

app.use((req, res) => {
  res.json({
    message: "Server is ready !",
  });
});

module.exports = app;
```

## Fill .gitignore & .env

back/.gitignore:

```
node_modules
/config/.env
```

back/config/.env:

```
PORT=<port>
```

## Check the server

(back) "nodemon server"

> expects "Listening on port 3000"

GET http://localhost:3000/

> expects "Server is ready !"
