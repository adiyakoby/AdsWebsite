let express = require('express');
let router = express.Router();
const {validateUserAccess} = require("../controllers/Authentication")


const db = require("../models");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',  async function (req, res, next) {
  if(await validateUserAccess(req.body.userName, req.body.password)){
    res.render('adminPage');
  }
  else {
    res.render('login');
  }
});


module.exports = router;
