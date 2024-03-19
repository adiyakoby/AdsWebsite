'use strict';
const db = require("../models");

const validateUserAccess = async function  (name, pass) {
    const user = await db.User.findOne({where: {login: name}});
    if (user) {
        return user.comparePassword(pass);
    }
    return false;
}

module.exports = {
    async login(req, res) {

        const check = await validateUserAccess(req.body.userName, req.body.password);
        if(check){
            req.session.loggedIn = true;
            res.render('adminPage');
        }
        else {
            res.render('login');
        }
    },

    async isAdmin(req, res) {
        if(typeof req.session.loggedIn !== 'undefined' && req.session.loggedIn === true) {
            res.render('adminPage');
        }
        else {
            res.render('login');
        }


    }
};

