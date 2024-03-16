'use strict';
const db = require("../models");


const validateUserAccess = async function (name, pass) {
    const user = await db.User.findOne({where: {login: name}});
    if (user) {
        return user.comparePassword(pass);
    }
    return false;
}

module.exports = {validateUserAccess};