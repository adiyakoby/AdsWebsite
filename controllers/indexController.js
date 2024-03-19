'use strict';

module.exports = {

    getHomePage(req, res) {
        res.render('homePage', { info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''} });
    },

    getSuccessPage(req, res) {
        res.render('success',{ info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''}});
    },

    getNewAdPage(req, res) {
        res.render('newAd', {errors: {} ,info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''}, formData: {} });
    },


    getLoginPage(req, res) {
        res.render('login', { info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''}});
    },



};