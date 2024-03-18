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
                len: {
                    args:[2, 20],
                    msg: "Title length must be between 2-20 characters."
                    }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: "Description length must be between 0-200 characters."
                    }
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
            validate: {
                is: {
                    args: /(^\d{2,3}-\d{7}$|)/,
                    msg: "Phone number isn't valid format.",
                },
            }

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
                    msg: "Email isn't valid, please provide valid email."
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

