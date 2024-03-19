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
        try {
            const check = await validateUserAccess(req.body.username, req.body.password);
            if(check){
                req.session.loggedIn = true;
                res.render('adminPage');
            }
            else {
                res.render('login');
            }
        } catch (e) {
            console.log("Something went wrong.", e.message)
        }

    },

    async isAdmin(req, res) {
        if(req.session.loggedIn === true) {
            res.render('adminPage');
        }
        else {
            res.render('login');
        }


    }
};

