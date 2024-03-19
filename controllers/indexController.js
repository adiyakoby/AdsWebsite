'use strict';

module.exports = {

    getHomePage(req, res) {
        res.render('homePage');
    },

    getSuccessPage(req, res) {
        res.render('success');
    },

    getNewAdPage(req, res) {
        res.render('newAd', {errors: {} , formData: {} });
    },


    getLoginPage(req, res) {
        res.render('login');
    },



};