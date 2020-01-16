var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
var home_controller = require('../controllers/homesController');

router.get('/get-homes', auth.bearerAuth, home_controller.homes_list_get);
router.get('/get-rooms', auth.bearerAuth, home_controller.rooms_list_get);
router.put('/update-home', auth.bearerAuth, home_controller.home_update_put);
router.put('/update-room', auth.bearerAuth, home_controller.room_update_put);
router.post('/create-home', home_controller.home_create_post);
router.post('/create-room', home_controller.room_create_post);
module.exports = router;