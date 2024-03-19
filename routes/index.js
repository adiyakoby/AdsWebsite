let express = require('express');
let router = express.Router();
const apiController = require("../controllers/apiController");


/* GET home page. */
router.get('/', async function (req, res) {
  res.render('homePage', { info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''} });
});



router.get('/success', function(req, res) {
  res.render('success',{ info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''}});
});

router.get('/newAd', function(req, res) {
  res.render('newAd', {errors: {} ,info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''}, formData: {} });
});

router.get('/logout', function (req, res) {
  req.session.loggedIn = false;
  res.render('homePage', { info: {loggedIn: req.session.loggedIn ,username: '', password: ''}});

});

router.get('/login', function(req, res) {
  res.render('login', { info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''}});
});

module.exports = router;
