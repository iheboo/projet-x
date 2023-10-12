// controllers/AuthController.js
const UserModel = require("../models/User");
const session = require('express-session');
const bcrypt = require('bcrypt');

module.exports = {
  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    UserModel.findOne({ where: { username } })
      .then((user) => {
        if (user) {
          return bcrypt.compare(password, user.password).then((isPasswordValid) => {
            if (isPasswordValid) {
              req.session.user = user;
              res.send(user);
            } else {
              res.send({ message: 'Wrong username/password combination!' });
            }
          });
        } else {
          res.send({ message: "User doesn't exist" });
        }
      })
      .catch((error) => {
        res.send({ err: error.message });
      });
  },
  
  checkLoggedIn: (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  },
  
};
