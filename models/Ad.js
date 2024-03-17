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
                notEmpty: {
                    args: true,
                    msg: "Title cannot be empty."
                },
                len: [2, 20],
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 200],
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "price cannot be empty."
                },
                isInt: true,
                min: {
                    args: [0],
                    msg: "price must be positive."
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Email cannot be empty."
                },
                isEmail: {
                    args: true,
                    msg: "Must contain valid email."
                }
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

