'use strict';

let express = require('express');
let router = express.Router();
const apiController = require("../controllers/adsController");
const isAdmin = require('../middlewares/adminAuthentication');
const isUser = require('../middlewares/userAuthentication');

router.get('/approvedAds', apiController.getApprovedAds); // Route to get approved ads
router.get('/approvedAds/:string', apiController.searchForAds); // Route to search for specific ads
router.post('/postAd', isUser ,apiController.postAd);  // Route to post a new ad

// Admin routes
router.get('/allAds', isAdmin, apiController.getAllAds); // Route to get all ads (admin only)
router.get('/pendingAds', isAdmin, apiController.getPendingAds); // Route to get pending ads (admin only)
router.put('/ads/:id', isAdmin, apiController.approveAd); // Route to approve an ad (admin only)
router.delete('/ads/:id', isAdmin, apiController.deleteAd); // Route to delete an ad (admin only)


module.exports = router;