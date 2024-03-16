const db = require("../models");
const { Sequelize } = require("sequelize");

module.exports = {
    async getAllAds() {
        fetch('./api/allAds')
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.statusText);
                return response.json();

            })
            .catch((err) => {
                console.log('Error message:', err);
            });
    }

};