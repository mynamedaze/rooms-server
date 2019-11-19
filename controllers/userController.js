var User = require('../models/userModel');
const {body, validationResult, sanitizeBody} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

exports.user_login_get = function (req, res) {
  User.findOne({'login': req.body.login})
    .lean()
    .select('login password email name age')
    .exec(async function (err, user) {
      if (err) {
        return handleError(err);
      }

      if (!user) {
        return res.json({success: false, error: "user was not found"});
      }

      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        delete user.password;
        const token = await jwt.sign(user._id.toString(), 'gbf4wregwgr4e63resg');
        return res.json({token, success: true});
      }
    })
};

exports.user_register_post = function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    var user = new User(
      {
        login: req.body.login,
        password: hash,
        email: req.body.email,
        name: req.body.name,
        age: parseInt(req.body.age)
      });
    user.save(function (err) {
      if (err) {
        return res.json(err);
      }
      res.send('registration success');
    });
  });
};

exports.user_info = function (req, res, next) {
  var decoded = jwt.verify(req.headers.somekey, 'gbf4wregwgr4e63resg');
  User.findOne({'_id': decoded})
    .lean()
    .select('email name age')
    .exec(async function (err, user) {
      if (err) {
        return handleError(err);
      }

      return res.json(user);
    });
};

exports.user_update_post = function (req, res) {

  console.log(req.userId,req.body );
  User.update({_id: req.userId}, {
    $set: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  }, (err, result ) =>{
    console.log('was upd', err, result);
  });

  res.send('заглушка на изменения профиля');
};