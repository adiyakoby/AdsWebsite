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
            const { username, password } = req.body;
            const isValidUser = await validateUserAccess(username, password);
            if(isValidUser){
                req.session.loggedIn = true;
                res.redirect('/adminPage');
            }
            else {
                res.render('login');
            }
        } catch (e) {
            console.log("Something went wrong.", e.message);
            res.status(500).send('Internal Server Error');
        }

    },

};

