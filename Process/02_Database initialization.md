# 02 - Databse Initialization

## DB configuration

Step 1: Lauch MySQL

If:

```sql
Welcome to the MySQL monitor. Commands end with ; or \g
Your MySQL connection id id 20
Server version: 8.0.29 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks od their respective
owners.

Type 'help'; or '\h' for help. Type '\c' to clear the current input statement.
```

Then go to step 2. Else write:

_(Lauch MySQL with user "root" )_

```sql
mysql -u root -p
```

Step 2: Create database

Enter:

```sql
CREATE DATABASE groupomania;
```

expects;

```sql
Query OK, 1 row affected (0.01 sec)
```

Step 3: Select DB

```sql
USE groupomania;
```

expects:

```sql
Database changed
```

## DB file(s)/folder(s) creation

back:

    > (back) "mkdir models"
    > (back/models) "index.js"
    > (back/config) "touch db.config.js"

## Configure MySQL database & Sequelize

back/config/db.config.js:

```javascript
require("dotenv").config({ path: "./config/config.env" });

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
```

_pool is optional, it will be used for Sequelize connection pool configuration:_

    max: maximum number of connection in pool
    min: minimum number of connection in pool
    acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: maximum time, in milliseconds, that a connection can be idle before being released

[API Reference for Sequelize constructor](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)

## Fill .env

back/config/config.env:

```
DB_NAME="name"
DB_USER="user"
DB_PASSWORD="password"
DB_HOST="host"
```

## Initialize Sequelize

back/models/index.js:

```javascript
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

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

module.exports = db;
```

back/app/app.js:

```javascript
const db = require("../models");
db.sequelize.sync();
```

## Reference(s)

[bezkoder.com](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
