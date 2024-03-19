'use strict';

const db = require("../models");
const { Sequelize } = require("sequelize");


/**
 * Formats Sequelize validation errors into a more readable object.
 * @param {Error} e - Sequelize validation error.
 * @returns {Object} - Formatted validation errors.
 */
const dbErrorHandler = function (e) {
    const errors = {};
    e.errors.forEach((item) => {
        errors[item.path] = item.message;
    });
    return errors;
}

module.exports = {

    /**
     * Retrieves all approved ads.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getApprovedAds(req, res) {
        try {
            await db.Ad.findAll({ where:{isApproved: true}, order: [['createdAt', 'DESC']]})
                .then((ads) => res.status(200).send(ads))
                .catch((err) => {
                    console.log('There was an error querying contacts', JSON.stringify(err))
                    err.error = 1; // some error code for client side
                    return res.status(400).send(err) // send the error to the client
                });
        }catch (err) {
            console.log('There was an error querying contacts', JSON.stringify(err))
        }
    },

    /**
     * Retrieves all ads.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getAllAds(req, res) {
        try {
            await db.Ad.findAll({ order: [['createdAt', 'DESC']]})
                .then((ads) => res.status(200).send(ads))
                .catch((err) => {
                    console.log('There was an error querying contacts', JSON.stringify(err))
                    err.error = 1; // some error code for client side
                    return res.status(400).send(err) // send the error to the client
                });
        }catch (err) {
            console.log('There was an error querying contacts', JSON.stringify(err))
        }
    },

    /**
     * Retrieves all pending ads.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getPendingAds(req, res) {
        try {
            await db.Ad.findAll({ where: {isApproved: false},order: [['createdAt', 'DESC']]})
                .then((ads) => res.status(200).send(ads))
                .catch((err) => {
                    console.log('There was an error querying contacts', JSON.stringify(err))
                    err.error = 1; // some error code for client side
                    return res.status(400).send(err) // send the error to the client
                });
        }catch (err) {
            console.log('There was an error querying contacts', JSON.stringify(err))
        }
    },

    /**
     * Creates a new ad.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async postAd(req, res) {
        const { title, description, price, email, phone } = req.body;
        try {
            const ad = await db.Ad.create({ title, description, price, phone, email });
            res.cookie('lastAdPosted', ad.id); // no maxAge so we will remember until user delete
            res.redirect('/success');
        }
        catch(err) {
            console.log('*** error creating a Ad', JSON.stringify(err))
            if(err.name === "SequelizeValidationError") {
                const errors = dbErrorHandler(err);
                return res.render('newAd', {
                    errors: errors,
                    formData: {title: title, description: description, price: price, email: email, phone: phone}
                })
            } else {
                res.status(500).send("Something bad happened, please try again later.", err.message)
            }

        }
    },

    /**
     * Searches for ads with titles containing a specific string.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async searchForAds(req, res) {
        try {
            await db.Ad.findAll({ where:{title: { [Sequelize.Op.like]: `%${req.params.string}%`} ,isApproved: true}, order: [['createdAt', 'DESC']]})
                .then((ads) => res.status(200).send(ads))
                .catch((err) => {
                    console.log('There was an error querying contacts', JSON.stringify(err))
                    err.error = 1; // some error code for client side
                    return res.status(400).send(err) // send the error to the client
                });
        }catch (err) {
            console.log('There was an error querying contacts', JSON.stringify(err))
            res.status(500).send("Internal Server Error");
        }
    },

    /**
     * Approves an ad by setting its 'isApproved' property to true.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async approveAd(req, res) {
        try {
            const ad = await db.Ad.findByPk(req.params.id);
            if(ad) {
                ad.isApproved = true;
                ad.save();
                res.status(204).send();
            }
            else {
                throw Error("add not found");
            }

        }catch (e) {
            console.log("Something went wrong.", e.message);
        }

    },

    /**
     * Deletes an ad from the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async deleteAd(req, res) {
        try {
            const ad = await db.Ad.findByPk(req.params.id);
            if(ad) {
                ad.destroy();
                res.status(204).send();
            }
            else {
                throw Error("add not found");
            }

        }catch (e) {
            console.log("Something went wrong.", e.message)
        }

    },

    /**
     * Gets the details of the last ad posted.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<Object>} - A promise resolving to the last ad posted.
     */
    async getLastAd(req, res) {
        try {
            const ad = await db.Ad.findByPk(req.cookies.lastAdPosted);
            return ad || "";

        }catch (e) {
            console.log("Something went wrong.", e.message);
            return null;
        }
    }

};