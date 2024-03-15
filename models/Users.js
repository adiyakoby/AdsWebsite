'use strict';

const { DataTypes, Model } = require('sequelize');


module.exports = (sequelize) => {
    class User extends Model {

    }

    User.init({

        login: {
            type: DataTypes.STRING,
            allowNull: false, // constraint level validation (SQL level validation)

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        accessLevel: {
            type: DataTypes.INTEGER,
        },

    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'User',
    });
    return User;
};

