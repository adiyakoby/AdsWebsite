'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Ad extends Model {

    }

    Ad.init({

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: "No Description provided."
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        sequelize, // We need to pass the connection instance
        hook: {},
        modelName: 'Ad'
    });
    return Ad;
}

