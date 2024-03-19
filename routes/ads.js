let express = require('express');
let router = express.Router();
const db = require('../models');
const apiController = require("../controllers/apiController");

router.get('/allAds', apiController.getAllAds); // get all ads

router.get('/approvedAds', apiController.getApprovedAds); // get all ads

router.get('/approvedAds/:string', apiController.searchForAds); // get all ads

router.get('/pendingAds', apiController.getPendingAds); // get all ads

router.post('/postAd', apiController.postAd);  // post new ad by sending the form.

router.put('/ads/:id', apiController.approveAd);

router.delete('/ads/:id', apiController.deleteAd);


module.exports = router;