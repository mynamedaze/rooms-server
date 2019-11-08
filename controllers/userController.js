var User = require('../models/userModel');
var async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.user_login_get = function(req, res) {
  User.findOne({ 'login': req.body.login })
    .lean()
    .select('login password email name age')
    .exec(function (err, user) {
    if (err){
      return handleError(err);
    }
    delete user.password;
    res.json(user);
  })
};

exports.user_register_post = function(req, res) {

    var user = new User(
      {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      });
    user.save(function (err) {
      if (err) {
        return  res.json(err);
      }
      res.json(user);
    });
  };

exports.user_update_get = function (req, res, next) {
  res.send('заглушка на запрос профиля');
};

exports.user_update_post = function (req, res, next) {
  res.send('заглушка на изменения профиля');
};