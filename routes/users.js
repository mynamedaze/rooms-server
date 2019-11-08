var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/login', user_controller.user_login_get);
router.post('/register', user_controller.user_register_post);

// router.get('/', user_controller.user_info);

router.put('/', user_controller.user_update_post);
// router.delete('/', user_controller.user_update_post);

module.exports = router;




