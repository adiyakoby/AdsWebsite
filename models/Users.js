'use strict';

const { DataTypes, Model } = require('sequelize');


module.exports = (sequelize) => {
    class User extends Model {

    }

    User.init({

        login: {
            type: DataTypes.STRING,
            allowNull: false, // constraint level validation (SQL level validation)
            // validate: { // sequelize level validation
            //     isAlpha: true,
            // }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: { // sequelize level validation
            //     isNumeric: true,
            // }
        },
        accessLevel: {
            type: DataTypes.INTEGER,
        }

    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'User',
    });
    return User;
};

