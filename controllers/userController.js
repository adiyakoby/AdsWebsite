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
            res.render('adminPage', {
                info: {loggedIn: true ,username: '', password: ''}
            });
        }
        else {
            res.render('login', {
                info: {loggedIn: false ,username: req.body.userName, password: req.body.password}
                });
        }
    },

    async isAdmin(req, res) {
        if(typeof req.session.loggedIn !== 'undefined' && req.session.loggedIn === true) {
            res.render('adminPage', {
                info: {loggedIn: true ,username: '', password: ''}
            });
        }
        else {
            res.render('login', { info: {loggedIn: false ,username: '', password: ''} });
        }


    }
};

