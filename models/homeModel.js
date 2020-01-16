var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HomeSchema = new Schema (
  {
    value: {type: String},
    userId: {type: String},
  }
);

module.exports = mongoose.model('Home', HomeSchema);