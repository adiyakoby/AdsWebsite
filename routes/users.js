let express = require('express');
let router = express.Router();
const userController = require("../controllers/userController")




router.post('/login', userController.login);

router.get('/admin', userController.isAdmin);

module.exports = router;
