// *************************************************************************************** IMPORT(S)

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
require("dotenv").config({ path: "../back/config/config.env" });
const User = db.user;
const Post = db.post;
const Comment = db.comment;

// *********************************************************************************** CONTROLLER(S)

exports.signup = async (req, res, next) => {
  if (!req.body.nickname)
    return res.status(400).json({ message: "Pseudo is required !" });
  if (!req.body.email)
    return res.status(400).json({ message: "Email is required !" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is required !" });

  if (req.body.password.includes(process.env.ROLE_TOKEN)) {
    await bcrypt
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
                expiresIn: "2h",
              }
            );
            user.token = token;
            user.save();
            res.status(201).json({ user });
          })
          .catch(() =>
            res.status(400).json({ message: "This email is already in use !" })
          );
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    await bcrypt
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
                expiresIn: "2h",
              }
            );
            user.token = token;
            user.save();
            res.status(201).json({ user });
          })
          .catch(() =>
            res.status(400).json({ message: "This email is already in use !" })
          );
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.signin = async (req, res, next) => {
  if (!req.body.email)
    return res.status(400).json({ message: "Email is required !" });
  if (!req.body.password)
    return res.status(400).json({ message: "Password is required !" });

  await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password !" });
          }
          const token = jwt.sign(
            {
              userId: user._id,
            },
            process.env.RANDOM_TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          user.save();
          res.status(200).json({ user });
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

  if (!user) return res.status(404).json({ message: "User not found !" });

  if (req.body.password) {
    if (user.role === "admin" || user._id == req.params.id) {
      await bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const newHashedPassword = hash;

          User.findOne({ where: { _id: req.params.id } })
            .then((userAccount) => {
              const { nickname, email, imgUrl, description } = req.body;

              const newData = {
                nickname: nickname ? nickname : userAccount.nickname,
                email: email ? email : userAccount.email,
                password: newHashedPassword
                  ? newHashedPassword
                  : userAccount.password,
                imgUrl: imgUrl ? imgUrl : userAccount.imgUrl,
                description: description
                  ? description
                  : userAccount.description,
              };

              userAccount
                .update(newData)
                .then((updatedAccount) =>
                  res.status(200).json({ updatedAccount })
                )
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(404).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden request: this is not your account !" });
    }
  } else {
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
            .then((updatedAccount) => res.status(200).json({ updatedAccount }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden request: this is not your account !" });
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (user.role === "admin" || user._id == req.params.id) {
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
      .then(() =>
        res
          .status(200)
          .json({ message: "The account has been successfully deleted !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden request: this is not your account !" });
  }
};

exports.followUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const userToFollow = await User.findOne({ where: { _id: req.params.id } });

  if (!userToFollow)
    return res.status(404).json({ message: "User to follow not found !" });

  if (userToFollow._id == user._id) {
    return res.status(404).json({ message: "User cannot follow himself !" });
  }

  if (!userToFollow.follower[user._id]) {
    userToFollow.follower = {
      ...userToFollow.follower,
      [user._id]: true,
    };

    user.following = {
      ...user.following,
      [userToFollow._id]: true,
    };

    await userToFollow
      .update({ follower: userToFollow.follower })
      .then(() => res.status(200))
      .catch((error) => res.status(400).json({ error }));

    await user
      .update({ following: user.following })
      .then(() =>
        res.status(200).json({ message: "You are now following this person !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res.json({ message: "You already follow this user !" });
  }
};

exports.unfollowUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const userToUnfollow = await User.findOne({ where: { _id: req.params.id } });

  if (!userToUnfollow)
    return res.status(404).json({ message: "User to unfollow not found !" });

  if (userToUnfollow._id == user._id) {
    return res.status(404).json({ message: "User cannot unfollow himself !" });
  }

  if (userToUnfollow.follower[user._id]) {
    userToUnfollow.follower = {
      ...userToUnfollow.follower,
      [user._id]: false,
    };

    user.following = {
      ...user.following,
      [userToUnfollow._id]: false,
    };

    await userToUnfollow
      .update({ follower: userToUnfollow.follower })
      .then(() => res.status(200))
      .catch((error) => res.status(400).json({ error }));

    await user
      .update({ following: user.following })
      .then(() =>
        res
          .status(200)
          .json({ message: "You are no longer following this person !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res.json({
      message: "You are not already following this person !",
    });
  }
};
