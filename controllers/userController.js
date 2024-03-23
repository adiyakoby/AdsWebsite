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
        return user || null;
    },

    /**
     * Handles user login authentication.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await module.exports.validateUserAccess(username, password);

            if(user){
                req.session.loggedIn = true;
                req.session.role = user.role;
                req.session.userId = user.id;
                if(user.role === 'admin')
                    return res.redirect('/adminPage');
                else
                    return res.redirect('/userPage');
            }
            else {
                return res.status(401).render('login'); // If user is not valid, render the login page again
            }
        } catch (e) {
            console.log("Something went wrong.", e.message);
            return res.status(500).render('error');
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
    },

    /**
     * Handles user registration.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async signup(req, res) {
        try {
            const { username, email, password } = req.body;

            const user = await db.User.create({
                login: username,
                password: password
            });
            if(user)
                req.session.loggedIn = true;

            res.redirect('/');
        } catch (e) {
            console.log("Something went wrong during registration.", e.message);
            res.status(500).render('error');
        }
    }


};

