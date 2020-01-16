var Home = require('../models/homeModel');
var Room = require('../models/roomModel');

exports.homes_list_get = function (req, res) {
  Home.find({userId: req.userId})
    .lean()
    .select('value')
    .exec(function (err, homes) {
      if (err) {
        return handleError(err);
      }

      if (!homes) {
        return res.json({success: false, error: "homes was not found"});
      } else {
        return res.json({homes});
      }

    })
};

exports.rooms_list_get = function (req, res) {
  console.log(req);
  Room.find({homeId: req.query.homeId})
    .lean()
    .select('value')
    .exec(function (err, rooms) {

      if (err) {
        return handleError(err);
      }

      if (!rooms) {
        return res.json({success: false, error: "rooms was not found"});
      } else {
        return res.json({rooms});
      }

    })
};

exports.home_update_put = function (req, res) {
  Home.update({_id: req.body.homeId}, {
    $set: {
      value: req.body.value,
    }
  }, (err, result ) =>{
    console.log('was upd', err, result);
    res.send('success');
  });
};

exports.room_update_put = function (req, res) {
  Room.update({_id: req.body.roomId}, {
    $set: {
      value: req.body.value,
    }
  }, (err, result ) =>{
    console.log('was upd', err, result);
    res.send('success');
  });
};

exports.home_create_post = function (req, res) {

  const home = new Home(
    {
      value: req.body.value,
      userId: req.body.userId
    }
  );

  home.save(function (err) {
    if (err) return handleError(err);

    res.send('home create success');
  });

};

exports.room_create_post = function (req, res) {
  const room = new Room(
    {
      value: req.body.value,
      homeId: req.body.homeId
    }
  );

  room.save(function (err) {
    if (err) return handleError(err);

    res.send('room create success');
  });

};