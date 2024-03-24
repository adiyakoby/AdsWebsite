'use strict';

const db = require("../models");
const {dbErrorHandler} = require('./adsController')

module.exports = {

    /**
     * Validates user access by checking the username and password against the database.
     * @param {string} name - The username to validate.
     * @param {string} pass - The password to validate.
     * @returns {Promise<object>} - The user object if validation is successful.
     * @throws {Error} - If user doesn't exist or wrong password.
     */
    async validateUserAccess(name, pass) {
        try {
            const user = await db.User.findOne({ where: { login: name } });
            if (!user) {
                const error = new Error("User doesn't exist.");
                error.name = 'AuthenticationError'; // Custom error name
                throw error;
            }

            const isPasswordCorrect = await user.comparePassword(pass);

            if (!isPasswordCorrect) {
                const error = new Error("Wrong password.");
                error.name = 'AuthenticationError';
                throw error;
            }

            return user;
        } catch (error) {
            throw error;
        }
    },


    /**
     * Handles user login authentication.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await module.exports.validateUserAccess(username, password);
            req.session.loggedIn = true;
            req.session.role = user.role;
            req.session.userId = user.id;

            if(user.role === 'admin')
                return res.redirect('/adminPage');
            else
                return res.redirect('/userPage');

        } catch (e) {

            if (e.name.includes("AuthenticationError")) {
                const errors = {}
                if (e.message.includes("User")) {
                    errors.username = e.message;
                } else {
                    errors.password = e.message;
                }
                return res.status(401).render('login', {
                        errors: errors,
                        formData: {username: username, password: password}
                    });
            } else {
                console.log("Something went wrong.", e.message);
                return res.status(500).render('error');
            }
        }
    },

    /**
     * Logs out the user by clearing the session and redirecting to the home page.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    logOut(req, res) {
        req.session.destroy();
        res.redirect('/'); // Redirect to the home page
    },

    /**
     * Handles user registration.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async signup(req, res) {
        const { username, password } = req.body;
        try {
            const user = await db.User.create({login: username, password: password});
            req.session.loggedIn = true;
            req.session.userId = user.id;
            req.session.role = user.role;
            res.redirect('/userPage');
        } catch (e) {
            console.log('*** error creating a user', JSON.stringify(e))
            if(e.name.includes('Sequelize')) {
                const errors = dbErrorHandler(e);

                return res.status(403).render('signUp', {
                    errors: errors,
                    formData: {login: username, password: password}
                })

            } else {
                console.log("Something went wrong during registration.", e.message);
                res.status(500).render('error');

            }
        }
    }


};

