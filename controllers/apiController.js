const db = require("../models");
const { Sequelize } = require("sequelize");


const dbErrorHandler = function (e) {
    const errors = {};
    e.errors.forEach((item) => {
        errors[item.path] = item.message;
    });
    return errors;
}

module.exports = {
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


    async postAd(req, res) {
        const { title, description, price, email, phone } = req.body;
        try {
            await db.Ad.create({ title, description, price, phone, email });
            res.redirect('/success');
        }
        catch(err) {
            console.log('*** error creating a Ad', JSON.stringify(err))
            if(err.name === "SequelizeValidationError") {
                const errors = dbErrorHandler(err);
                console.log(errors)
                return res.render('newAd', {
                    errors: errors,
                    info: {loggedIn: req.session.loggedIn || false ,username: '', password: ''},
                    formData: {title: title, description: description, price: price, email: email, phone: phone}
                })
            } else {
                res.status(500).send("Something bad happened, please try again later.", err.message)
            }

        }
    },

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
            console.log("Something went wrong.", e.message)
        }

    },

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


};