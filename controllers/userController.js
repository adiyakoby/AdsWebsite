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
            res.render('adminPage');
        }
        else {
            res.render('login', {user: req.body.userName, pass: req.body.password});
        }
    },
};

