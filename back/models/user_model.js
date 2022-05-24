// ********************************************************************************* SCHEMA MODEL(S)

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
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING(200),
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
