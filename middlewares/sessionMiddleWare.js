'use strict';
const db = require("../models");

const sessionMiddleware = (req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false;
    res.locals.username = req.session.username || '';
    res.locals.password = req.session.password || '';
    next();
};

module.exports = sessionMiddleware;