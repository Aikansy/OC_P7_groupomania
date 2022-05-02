# 06 - User controllers update

## User controllers

back/controllers/user_controllers.js:

#### SIGNUP controller

```javascript
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
            res.status(201).json({
              token: token,
              message: "The admin account has been successfully created !",
            });
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
            res.status(201).json({
              token: token,
              message: "The user account has been successfully created !",
            });
          })
          .catch(() =>
            res.status(400).json({ message: "This email is already in use !" })
          );
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
```

#### SIGNIN controller

```javascript
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
          res.status(200).json({
            token: token,
            message: "The user has been successfully logged-in !",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
```

#### FINDALLUSER controller

```javascript
exports.findAllUser = async (req, res, next) => {
  await User.findAll({
    attributes: { exclude: ["token", "email", "password", "role"] },
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
};
```

#### FINDONEUSER controller

```javascript
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
  } else if (user._id === req.params.id) {
    User.findOne({
      where: { _id: req.params.id },
      attributes: { exclude: ["token", "password", "role"] },
    })
      .then((account) => res.status(200).json({ account }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    User.findOne({
      where: { _id: req.params.id },
      attributes: { exclude: ["token", "email", "password", "role"] },
    })
      .then((account) => res.status(200).json({ account }))
      .catch((error) => res.status(400).json({ error }));
  }
};
```

#### UPDATEUSER controller

```javascript
exports.updateUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (user.role === "admin" || userId === req.params.id) {
    await bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const newHashedPassword = hash;

        User.findOne({ where: { _id: req.params.id } })
          .then((account) => {
            const data = req.body;

            for (let key of Object.keys(data)) {
              if (!data[key]) {
                delete data[key];
              }

              User.update(
                { [key]: data[key], password: newHashedPassword },
                { where: { _id: req.params.id } }
              );
            }

            account.save();
            res.status(200).json({
              message: "The account has been successfully updated !",
            });
          })
          .catch((error) => res.status(404).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    return res.status(403).json({
      message: "Unauthorized request: this is not your account !",
    });
  }
};
```

#### DELETEUSER controller

```javascript
exports.deleteUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (user.role === "admin" || userId === req.params.id) {
    await User.destroy({ where: { _id: req.params.id } });

    await Post.findAll({ where: { creator_id: req.params.id } })
      .then((posts) => {
        if (posts) {
          Post.destroy({ where: { creator_id: req.params.id } });
        }
      })
      .catch((error) => res.status(400).json({ error }));

    res
      .status(200)
      .json({ message: "The account has been successfully deleted !" });
  } else {
    return res.status(403).json({
      message: "Unauthorized request: this is not your account !",
    });
  }
};
```

## Update config.env

back/config/config.env:

```
ROLE_TOKEN=<role token>
```
