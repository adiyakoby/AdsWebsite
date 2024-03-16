const db = require("../models");
const { Sequelize } = require("sequelize");

module.exports = {
    async getAllAds(req, res) {
        return await db.Ad.findAll();
    }

};