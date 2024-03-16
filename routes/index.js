let express = require('express');
let router = express.Router();
const api = require("../controllers/apiController")

/* GET home page. */
router.get('/', async function (req, res, next) {
  const ads = await api.getAllAds(req, res);
  console.log(ads.json());
  res.render('index');
});

router.get('/newAd', function(req, res, next) {
  res.render('newAd', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
