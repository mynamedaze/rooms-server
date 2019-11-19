var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    login: {type: String, unique: true, index: true, min: 6},
    password: {type: String, min: 6},
    email: {type: String},
    name: {type: String},
    age: {type: Number, min: 18, max: 130},
    sex: {type: String, enum: ['male', 'female', 'unspecified'], default: 'unspecified'}
  }
);

module.exports = mongoose.model('User', UserSchema);