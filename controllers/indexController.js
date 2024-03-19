'use strict';

const {getLastAd} = require('./adsController')

module.exports = {

    /**
     * Renders the home page view.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    getHomePage(req, res) {
        res.render('homePage');
    },

    /**
     * Renders the success page view.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    getSuccessPage(req, res) {
        res.render('success');
    },

    /**
     * Renders the new ad page view, optionally populating form fields with last ad data.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getNewAdPage(req, res) {
        try {
            const ad = await getLastAd(req, res);
            res.locals.email = ad.email || "";
            res.locals.updatedAt = ad.updatedAt || "";
            res.locals.isApproved = ad.isApproved || "";

            res.render('newAd', {errors: {}, formData: {}});  // Render the new ad page with empty form data and errors object
        } catch (error) {
            console.error("Error in getNewAdPage:", error);
            res.status(500).send('Internal Server Error');
        }

    },

    /**
     * Renders the login page view.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    getLoginPage(req, res) {
        res.render('login');
    },

    /**
     * Renders the admin page view.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    getAdminPage(req, res) {
      res.render('adminPage');
    },

};