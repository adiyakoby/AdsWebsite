'use strict';

const sessionMiddleware = (req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false;
    res.locals.username = req.body.username || '';
    res.locals.password = req.body.password || '';
    next();
};

module.exports = sessionMiddleware;