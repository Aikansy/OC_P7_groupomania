// *************************************************************************************** IMPORT(S)

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/index");
const fs = require("fs");
require("dotenv").config({ path: "../back/config/config.env" });
const User = db.user;
const Post = db.post;
const Comment = db.comment;

// *********************************************************************************** CONTROLLER(S)

exports.signup = async (req, res, next) => {
  if (!req.body.nickname)
    return res.status(400).json({ message: "Nickname is required !" });
  if (!req.body.email)
    return res.status(400).json({ message: "Email is required !" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is required !" });

  await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return res.status(400).json({ error: "Email already in use !" });
      } else {
        if (req.body.password.includes(process.env.ROLE_TOKEN)) {
          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              const user = {
                nickname: req.body.nickname,
                email: req.body.email,
                password: hash,
                role: "admin",
              };

              User.create(user)
                .then((user) => {
                  const token = jwt.sign(
                    {
                      userId: user._id,
                    },
                    process.env.RANDOM_TOKEN_SECRET,
                    {
                      expiresIn: "24h",
                    }
                  );
                  user.token = token;
                  user.save();
                  res.status(201).json({
                    userId: user._id,
                    token: token,
                    nickname: user.nickname,
                  });

                  const profileDir = `../front/src/uploads/profils/user_${user._id}`;
                  if (!fs.existsSync(profileDir)) {
                    fs.mkdirSync(profileDir, {
                      recursive: true,
                    });
                  }

                  const imageDir = "../back/assets/icon.jpg";
                  const profilImageDir = `../front/src/uploads/profils/user_${user._id}/`;
                  fs.readFile(imageDir, function (error, data) {
                    if (error) throw error;
                    fs.writeFile(
                      `${profilImageDir}/profile_${user._id}.jpg`,
                      data,
                      function (error) {
                        if (error) throw error;
                      }
                    );
                  });
                })
                .catch(() =>
                  res.status(400).json({ error: "Email already in use !" })
                );
            })
            .catch((error) => res.status(500).json({ error }));
        } else {
          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              const user = {
                nickname: req.body.nickname,
                email: req.body.email,
                password: hash,
              };

              User.create(user)
                .then((user) => {
                  const token = jwt.sign(
                    {
                      userId: user._id,
                    },
                    process.env.RANDOM_TOKEN_SECRET,
                    {
                      expiresIn: "24h",
                    }
                  );
                  const profileDir = `../front/src/uploads/profils/user_${user._id}`;
                  if (!fs.existsSync(profileDir)) {
                    fs.mkdirSync(profileDir, {
                      recursive: true,
                    });
                  }

                  const imageDir = "../back/assets/icon.jpg";
                  const profilImageDir = `../front/src/uploads/profils/user_${user._id}/`;
                  fs.readFile(imageDir, function (error, data) {
                    if (error) throw error;
                    fs.writeFile(
                      `${profilImageDir}/profile_${user._id}.jpg`,
                      data,
                      function (error) {
                        if (error) throw error;
                      }
                    );
                  });

                  user.token = token;
                  user.save();
                  res.status(201).json({
                    userId: user._id,
                    token: token,
                    nickname: user.nickname,
                  });
                })
                .catch(() =>
                  res.status(400).json({ error: "Email already in use !" })
                );
            })
            .catch((error) => res.status(500).json({ error }));
        }
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.signin = async (req, res, next) => {
  if (!req.body.email)
    return res.status(400).json({ message: "Email is required !" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is required !" });

  await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Email not found !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Password is not correct !" });
          }
          const token = jwt.sign(
            {
              userId: user._id,
            },
            process.env.RANDOM_TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          );
          user.token = token;
          user.save();
          res
            .status(200)
            .json({ userId: user._id, token: token, nickname: user.nickname });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.findAllUsers = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (user.role === "admin") {
    await User.findAll({
      attributes: { exclude: ["password", "role"] },
    })
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(404).json({ error }));
  } else {
    await User.findAll({
      attributes: { exclude: ["token", "password", "role"] },
    })
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(404).json({ error }));
  }
};

exports.findOneUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (user.role === "admin") {
    User.findOne({
      where: { _id: req.params.id },
    })
      .then((account) => res.status(200).json({ account }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    User.findOne({
      where: { _id: req.params.id },
      attributes: { exclude: ["token", "password", "role"] },
    })
      .then((account) => res.status(200).json({ account }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.updateUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (!user) return res.status(404).json({ error: "User not found !" });

  await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return res.status(400).json({ error: "Email already in use !" });
      } else {
        User.findOne({ where: { _id: userId } })
          .then((user) => {
            if (req.body.password) {
              if (user.role === "admin" || user._id == req.params.id) {
                bcrypt
                  .hash(req.body.password, 10)
                  .then((hash) => {
                    const newHashedPassword = hash;

                    User.findOne({ where: { _id: req.params.id } })
                      .then((userAccount) => {
                        const { nickname, email, description } = req.body;

                        const newData = {
                          nickname: nickname ? nickname : userAccount.nickname,
                          email: email ? email : userAccount.email,
                          password: newHashedPassword,
                          description: description
                            ? description
                            : userAccount.description,
                        };

                        userAccount
                          .update(newData)
                          .then(() => res.status(200))
                          .catch(() => res.status(400).json({ error: "1" }));
                      })
                      .catch(() => res.status(404).json({ error: "2" }));
                  })
                  .catch(() => res.status(500).json({ error: "3" }));
              } else {
                return res.status(403).json({
                  error: "Forbidden request: this is not your account !",
                });
              }
            }

            if (user.role === "admin" || user._id == req.params.id) {
              User.findOne({ where: { _id: req.params.id } })
                .then((userAccount) => {
                  const data = req.body;
                  for (let key of Object.keys(data)) {
                    if (!data[key]) {
                      delete data[key];
                    }
                    userAccount.update({ [key]: data[key] });
                  }
                  userAccount
                    .save()
                    .then((updatedAccount) =>
                      res.status(200).json({ updatedAccount })
                    )
                    .catch(() => res.status(400).json({ error: "4" }));
                })
                .catch(() => res.status(400).json({ error: "5" }));
            } else {
              return res.status(403).json({
                error: "Forbidden request: this is not your account !",
              });
            }
          })
          .catch(() => res.status(400).json({ error: "6" }));
      }
    })
    .catch(() => res.status(400).json({ error: "7" }));
};

exports.updateImageUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (!user) return res.status(404).json({ error: "User not found !" });

  if (user.role === "admin" || user._id == req.params.id) {
    if (!req.file) {
      return res.json({ error: "No image" });
    } else {
      user
        .update({ imgUrl: req.file.filename })
        .then(() =>
          res
            .status(200)
            .json({ message: "Image has been successfully uploaded !" })
        )
        .catch((error) => res.status(400).json({ error }));
    }
  } else {
    return res.status(403).json({
      error: "Forbidden request: this is not your account !",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const dirProfil = `../front/src/uploads/profils/user_${req.params.id}`;
  const dirPost = `../front/src/uploads/posts/user_${req.params.id}`;

  if (user.role === "admin" || user._id == req.params.id) {
    if (fs.existsSync(dirProfil)) {
      fs.rmSync(dirProfil, { recursive: true, force: true });
    }

    if (fs.existsSync(dirPost)) {
      fs.rmSync(dirPost, { recursive: true, force: true });
    }

    await Comment.findAll({ where: { commentator_id: req.params.id } })
      .then((comments) => {
        if (comments) {
          Comment.destroy({ where: { commentator_id: req.params.id } });
        }
      })
      .catch((error) => res.status(400).json({ error }));

    await Comment.findAll({ where: { postCreator_id: req.params.id } })
      .then((comments) => {
        if (comments) {
          Comment.destroy({ where: { postCreator_id: req.params.id } });
        }
      })
      .catch((error) => res.status(400).json({ error }));

    await Post.findAll({ where: { creator_id: req.params.id } })
      .then((posts) => {
        if (posts) {
          Post.destroy({ where: { creator_id: req.params.id } });
        }
      })
      .catch((error) => res.status(400).json({ error }));

    await User.destroy({ where: { _id: req.params.id } })
      .then(() => {
        if (user.role === "admin") {
          res.status(200).json({
            message: "The account has been successfully deleted by Admin !",
          });
        } else {
          res
            .status(200)
            .json({ message: "The account has been successfully deleted !" });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res.status(403).json({
      error: "Forbidden request: this is not your account !",
    });
  }
};
