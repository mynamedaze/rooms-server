var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    login: {type: String, unique: true, index: true, min: 6},
    password: {type: String, min: 6},
    email: {type: String},
    name: {type: String},
    age: {type: Number, min: 18, max: 130}
  }
);

module.exports = mongoose.model('User', UserSchema);