// controllers/RegisterController.js
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds =15

module.exports = {
    register: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
      
        bcrypt
          .hash(password, saltRounds)
          .then((hashedPassword) => {
            return UserModel.create({
              username: username,
              password: hashedPassword,
            });
          })
          .then((newUser) => {
            res.send(newUser);
          })
          .catch((error) => {
            console.log(error);
            res.send({ err: error.message });
          });
      },
      
};
