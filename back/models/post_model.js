// *************************************************************************************** IMPORT(S)

const { DataTypes } = require("sequelize");

// ********************************************************************************* SCHEMA MODEL(S)

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
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likers: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  });
  return Post;
};
