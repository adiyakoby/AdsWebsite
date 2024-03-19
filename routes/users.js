'use strict';

let express = require('express');
let router = express.Router();
const userController = require("../controllers/userController")

// Route for handling user login POST request
router.post('/login', userController.login);

// Route for handling user logout GET request
router.get('/logout', userController.logOut);

module.exports = router;
