var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema (
  {
    value: {type: String},
    homeId: {type: String},
  }
);

module.exports = mongoose.model('Room', RoomSchema);