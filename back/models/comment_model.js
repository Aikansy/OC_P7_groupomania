// *************************************************************************************** IMPORT(S)

const { DataTypes } = require("sequelize");

// ********************************************************************************* SCHEMA MODEL(S)

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
    postCreator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comment;
};
