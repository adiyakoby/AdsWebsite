let express = require('express');
let router = express.Router();
const indexController = require("../controllers/indexController");


/* GET home page. */
router.get('/', indexController.getHomePage);

router.get('/success', indexController.getSuccessPage);

router.get('/newAd', indexController.getNewAdPage);

router.get('/logout', function (req, res) {
  req.session.loggedIn = false;
  res.render('homePage');

});

router.get('/login', indexController.getLoginPage);

module.exports = router;
