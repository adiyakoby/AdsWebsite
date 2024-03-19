let express = require('express');
let router = express.Router();
const userController = require("../controllers/userController")



router.post('/login', userController.login);

router.get('/logout', userController.logOut);

module.exports = router;
