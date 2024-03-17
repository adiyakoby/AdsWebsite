const db = require("../models");
const { Sequelize } = require("sequelize");

module.exports = {
    async getAllAds(req, res) {
        try {
            await db.Ad.findAll({ order: [['createdAt', 'DESC']]})
                .then((ads) => res.send(ads))
                .catch((err) => {
                    console.log('There was an error querying contacts', JSON.stringify(err))
                    err.error = 1; // some error code for client side
                    return res.status(400).send(err) // send the error to the client
                });
        }catch (err) {
            console.log('There was an error querying contacts', JSON.stringify(err))
        }


    },

    async postAd(req, res) {
        const { title, description, price, email, phone } = req.body;
        try {
            await db.Ad.create({ title, description, price, phone, email });
            res.status(201).render('newAd');
        }
        catch(err) {
            console.log('*** error creating a Ad', JSON.stringify(err))
            if(err.name === "SequelizeValidationError")
                return res.render('newAd', {message:err.message});
        }
    },

};