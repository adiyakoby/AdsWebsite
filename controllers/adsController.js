'use strict';

const db = require("../models");
const { Sequelize } = require("sequelize");

module.exports = {

    // Messages
    messages: {
        adApproved: "Ad was approved successfully.",
        adAlreadyApproved: "Ad was already approved.",
        adDeleted: "Ad was deleted successfully.",
        adNotFound: "Ad not found.",
        errorMessage: "Something went wrong.",
        serverError: "Internal Server Error",
    },

    /**
     * Formats Sequelize validation errors into a more readable object.
     * @param {Error} e - Sequelize validation error.
     * @returns {Object} - Formatted validation errors.
     */
    dbErrorHandler(e) {
        const errors = {};
        e.errors.forEach((item) => {
            errors[item.path] = item.message;
        });
        return errors;
    },


    /**
     * Retrieves all approved ads.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getApprovedAds(req, res) {
        try {
            const ads = await db.Ad.findAll({ where:{isApproved: true}, order: [['createdAt', 'DESC']]})
            return res.status(200).send(ads);
        } catch (e) {
            console.log(module.exports.messages.serverError);
            res.status(500).send(module.exports.messages.serverError)
        }

    },

    /**
     * Retrieves all ads.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getAllAds(req, res) {
        try {
            const ads =  await db.Ad.findAll({ order: [['createdAt', 'DESC']]});
            return res.status(200).send(ads);
        } catch (e) {
            console.log(module.exports.messages.serverError);
            res.status(500).send(module.exports.messages.serverError)
        }

    },

    /**
     * Retrieves all pending ads.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getPendingAds(req, res) {
        try {
            const ads = await db.Ad.findAll({ where: {isApproved: false},order: [['createdAt', 'DESC']]});
            return res.status(200).send(ads);
        } catch (e) {
            console.log(module.exports.messages.serverError);
            res.status(500).send(module.exports.messages.serverError)
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
                const errors = module.exports.dbErrorHandler(err);
                await module.exports.getLastAd(req, res);

                return res.status(403).render('newAd', {
                    errors: errors,
                    formData: {title: title, description: description, price: price, email: email, phone: phone}
                })

            } else {
                res.status(500).send(module.exports.messages.serverError)
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
            const ads = await db.Ad.findAll({ where:{
                    title: { [Sequelize.Op.like]: `%${req.params.string}%`},
                    isApproved: true}, order: [['createdAt', 'DESC']]});

            return res.status(200).send(ads);

        }catch (e) {
            console.log(module.exports.messages.errorMessage, e.message)
            res.status(500).send(module.exports.messages.serverError);
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
            if(!ad) {
                return res.status(404).send(module.exports.messages.adNotFound);
            }
            else if(ad && ad.isApproved === true) {
                return res.status(200).send(module.exports.messages.adAlreadyApproved);
            }
            else {
                ad.isApproved = true;
                ad.save();
                return res.status(200).send(module.exports.messages.adApproved);
            }
        } catch (e) {
            console.log(this.messages.errorMessage, e.message)
            return res.status(500).send(module.exports.messages.serverError);
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
            if(ad && (req.session.role === 'admin' || req.session.userId === ad.user_id)) {
                ad.destroy();
                return res.status(200).send(module.exports.messages.adDeleted);
            }
            else {
                return res.status(404).send(module.exports.messages.adNotFound);
            }

        }catch (e) {
            console.log(module.exports.messages.errorMessage, e.message)
            return res.status(500).send(module.exports.messages.serverError);
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
            res.locals.email = ad ? ad.email : "";
            res.locals.updatedAt = ad ? ad.updatedAt : "";
            res.locals.isApproved = ad ? ad.isApproved : "";

            return ad || "";

        }catch (e) {
            console.log(module.exports.messages.errorMessage, e.message);
            return null;
        }
    },

    /**
     * Retrieves all ads belonging to the logged-in user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getUserAds(req, res) {
        try {
            const user = await db.User.findByPk(req.session.userId);
            if(!user){
                return res.status(404).send('User not found');
            }

            const ads = await user.getAds();
            return res.status(200).json(ads);
        } catch (error) {
            console.error("Error retrieving user ads:", error);
            return res.status(500).send("Internal server error");
        }
    }


};