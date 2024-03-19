let express = require('express');
let router = express.Router();
const apiController = require("../controllers/adsController");
const isAdmin = require('../middlewares/authentication');

router.get('/approvedAds', apiController.getApprovedAds); // get approved ads

router.get('/approvedAds/:string', apiController.searchForAds); // get selected ads

router.post('/postAd', apiController.postAd);  // post new ad by sending the form.

// Admin routes
router.get('/allAds', isAdmin ,apiController.getAllAds); // get all ads

router.get('/pendingAds', isAdmin ,apiController.getPendingAds);

router.put('/ads/:id', isAdmin, apiController.approveAd);

router.delete('/ads/:id', isAdmin, apiController.deleteAd);


module.exports = router;