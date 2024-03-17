'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Ad extends Model {

    }

    Ad.init({

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Title cannot be empty."},
                len: [2, 20],
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "No Description provided.",
            validate: {
                len: [0, 200],
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {msg: "price cannot be empty."},
                isInt: true,
                min: 0
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Not provided."
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "Email cannot be empty."},
                isEmail: {msg: "Must contain valid email."}
            }
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false //ads not aprroved when poseted
        },

    }, {
        sequelize, // We need to pass the connection instance
        hook: {},
        modelName: 'Ad'
    });
    return Ad;
}

