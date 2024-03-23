'use strict';

const db = require("../models");

module.exports = {

    /**
     * Validates user access by checking the username and password against the database.
     * @param {string} name - The username to validate.
     * @param {string} pass - The password to validate.
     * @returns {boolean} - True if the user is valid, otherwise false.
     */
    async validateUserAccess (name, pass) {
        const user = await db.User.findOne({where: {login: name}});
        if (user) {
            return user.comparePassword(pass);
        }
        return false;
    },

    /**
     * Handles user login authentication.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const isValidUser = await module.exports.validateUserAccess(username, password);
            if(isValidUser){
                req.session.loggedIn = true;
                res.redirect('/adminPage');
            }
            else {
                res.render('login'); // If user is not valid, render the login page again
            }
        } catch (e) {
            console.log("Something went wrong.", e.message);
            res.status(500).render('error');
        }

    },

    /**
     * Logs out the user by clearing the session and redirecting to the home page.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    logOut(req, res) {
        req.session.loggedIn =  res.locals.loggedIn = false;  // Clear loggedIn flag in session and response locals
        res.redirect('/'); // Redirect to the home page
    }




};

