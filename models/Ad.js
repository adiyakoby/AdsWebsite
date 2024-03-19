'use strict';

const { DataTypes, Model } = require('sequelize');

/**
 * Represents an advertisement posted by a user.
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @returns {import('sequelize').Model} - The Ad model.
 */
module.exports = (sequelize) => {
    class Ad extends Model {

    }

    // Define the Ad model's attributes
    Ad.init({

        // Title of the advertisement
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Title cannot be empty."
                },
                len: {
                    args:[1, 20],
                    msg: "Title length must be between 2-20 characters."
                    }
            }
        },

        // Description of the advertisement
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

        // Price of the advertised item
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "price cannot be empty."
                    },
                isInt: {
                    args: true,
                    msg: 'price must be integer.'
                    },
                min: {
                    args: [0],
                    msg: "price must be positive."
                    }
            }
        },

        // Phone number associated with the advertisement
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^(\d{2,3}-\d{7})?$/,
                    msg: "Phone number isn't valid format.",
                },
            }

        },

        // Email of the advertiser
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

        // Indicates whether the advertisement is approved by the admin
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

