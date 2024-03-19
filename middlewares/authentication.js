'use strict';

const isAdmin = async (req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }
        next()
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = isAdmin;
