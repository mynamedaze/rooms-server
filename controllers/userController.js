var User = require('../models/userModel');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');


exports.user_login_get = function(req, res) {
  User.findOne({ 'login': req.body.login })
    .lean()
    .select('login password email name age')
    .exec(async function (err, user) {
    if (err){
      return handleError(err);
    }
      const match = await bcrypt.compare(req.body.password, user.password);

      if(match) {
        delete user.password;
        const token = await jwt.sign(user, 'gbf4wregwgr4e63resg', { expiresIn: '7d' });
        res.json({user, token});
      }
  })
};

exports.user_register_post = function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      var user = new User(
        {
          login: req.body.login,
          password: hash,
          email: req.body.email,
          name: req.body.name,
          age: req.body.age
        });
      user.save(function (err) {
        if (err) {
          return  res.json(err);
        }
        res.send('registration success');
      });
    });
  };

exports.user_update_get = function (req, res, next) {
  res.send('заглушка на запрос профиля');
};

exports.user_update_post = function (req, res, next) {
  res.send('заглушка на изменения профиля');
};