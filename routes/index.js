let express = require('express');
let router = express.Router();
const indexController = require("../controllers/indexController");
const isAdmin = require('../middlewares/authentication');



/* GET home page. */
router.get('/', indexController.getHomePage);

router.get('/success', indexController.getSuccessPage);

router.get('/newAd', indexController.getNewAdPage);

router.get('/logout', function (req, res) {
  req.session.loggedIn =  res.locals.loggedIn = false;
  res.render('homePage');

});

router.get('/login', indexController.getLoginPage);

router.get('/adminPage', isAdmin, indexController.getAdminPage);

module.exports = router;
