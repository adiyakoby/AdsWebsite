'use strict';

const {getLastAd} = require('./adsController')

module.exports = {

    getHomePage(req, res) {
        res.render('homePage');
    },

    getSuccessPage(req, res) {
        res.render('success');
    },

    async getNewAdPage(req, res) {
        if (req.cookies.lastAdPosted) {
            const ad = await getLastAd(req, res);
            res.locals.email = ad.email;
            res.locals.updatedAt = ad.updatedAt;
            res.locals.isApproved = ad.isApproved;
        }
        res.render('newAd', {errors: {}, formData: {}});
    },


    getLoginPage(req, res) {
        res.render('login');
    },

    getAdminPage(req, res) {
      res.render('adminPage');
    },





};