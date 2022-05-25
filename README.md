# GROUPIX - Groupomania internal social network

    In order to run this project, you will need a database using mysql (for sequelize) and a <named database>.

## RUN THE PROJECT LOCALLY

#### Clone the project:

```bash
git clone https://github.com/Aikansy/OC_P7
```

#### BACK-END PROCEDURE

#### Install dependencies

go to **project directory/back folder**

```bash
  npm install
```

#### Create needed file(s)

Create **config.env** file in **back/config/** with in it:

```bash
PORT=<the desired port for the back-end server except 3000>
DB_NAME=<named database>
DB_USER=<DB user name>
DB_PASSWORD=<DB password>
DB_HOST="localhost"
RANDOM_TOKEN_SECRET=<your secret string>
ROLE_TOKEN=<element to include in the password during registration to allocate the admin role>
```

#### Start the back-end server

go to **project directory/back folder**

```bash
  nodemon server
```

#### FRONT-END PROCEDURE

#### Start the front-end server

go to **project directory/front folder**

```bash
  yarn start
```

or

```bash
  npm start
```
