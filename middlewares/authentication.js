'use strict';

/**
 * Middleware function to check if the user is authenticated as an admin.
 * If the user is not logged in, redirects to the login page.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {void}
 */
const isAdmin = async (req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(401).render('login');
        }
        next(); // If logged in, proceed to the next middleware or route handler

    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = isAdmin;
