# 04 - Schema creation

## User & Post schema models

#### USER:

back/models/user_model.js:

```javascript
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    _id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: Sequelize.STRING,
      defaultValue: "null",
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    imgUrl: {
      type: Sequelize.STRING,
      defaultValue:
        "https://img1.freepng.fr/20180714/ggq/kisspng-user-profile-computer-icons-login-clip-art-profile-picture-icon-5b49de2f1ef441.4301202215315676631268.jpg",
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: "No Description",
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: "user",
    },
  });
  return User;
};
```

#### POST:

back/models/post_model.js:

```javascript
module.exports = (sequelize) => {
  const Post = sequelize.define("post", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likers: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    comments: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  });
  return Post;
};
```

#### COMMENT:

back/models/comment_model.js:

```javascript
module.exports = (sequelize) => {
  const Comment = sequelize.define("comment", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comment;
};
```
