let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('homePage');
});

router.get('/newAd', function(req, res, next) {
  res.render('newAd', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { user:'', pass:'' });
});

module.exports = router;
