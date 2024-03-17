let express = require('express');
let router = express.Router();
const userController = require("../controllers/userController")


const db = require("../models");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', userController.login);

router.get('/admin', userController.isAdmin);

module.exports = router;
