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

expects:

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

## MySQL DB file(s)/folder(s) creation

back:

    > (back) "mkdir models"
    > (back/models) "touch index.js"

## Configure MySQL database & Sequelize

back/models/index.js:

```javascript
const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "../back/config/config.env" });

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
db.user = require("./user_model")(sequelize, Sequelize);
db.post = require("./post_model")(sequelize, Sequelize);
db.comment = require("./comment_model")(sequelize, Sequelize);

try {
  sequelize.authenticate();
  console.log("Successful connection to MySQL database !");
} catch (error) {
  console.error("Impossible to connect !", error);
}

module.exports = db;
```

## Import DB

back/app:app.js:

```javascript
const db = require("../models/index");
db.sequelize.sync();
```

## Reference(s)

[API Reference for Sequelize constructor](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)

[MySQL DB Creation](https://practicalprogramming.fr/nodejs-mysql)

[w3c School](https://www.w3schools.com/nodejs/nodejs_mysql.asp)
