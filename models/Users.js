'use strict';

const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * User model definition
 * @param {import('sequelize').Sequelize} sequelize - Sequelize instance
 */
module.exports = (sequelize) => {


    class User extends Model {

        /**
         * Establishes the association between the User model and the Ad model.
         * @param {Object} models - Object containing all defined Sequelize models.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Ad, {
                foreignKey: 'user_id',
            });
        }
        /**
         * Hashes the user's password
         */
        async hashPassword() {
            try {
                const salt = await bcrypt.genSalt(saltRounds);
                this.password = await bcrypt.hash(this.password, salt);
            }
            catch (e) {
                console.log("error hashing password", e.message);
                throw new Error('Failed to hash password');
            }

        };

        /**
         * Compares the provided password with the user's stored hashed password
         * @param {string} pass - The password to compare
         * @returns {Promise<boolean>} - Whether the passwords match
         */
        async comparePassword(pass) {
            return bcrypt.compare(pass, this.password);
        };
    }

    // Initialize the User model
    User.init({

        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "username name is taken."
            },
            validate: {
                notEmpty: {msg: 'username cannot be empty.'},
                len: {
                    args: [3, 20],
                    msg: "Username length must be between 3 to 20 characters."
                },
                isAlphanumeric: {msg: "username must contain only letters and numbers."},
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "password cannot be empty."},
                len: {args:[4, 20],
                msg: "password length must be between 4 to 20 characters."
                    }
            }
        },
        role : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user"
        }

    }, {
        sequelize, // We need to pass the connection instance
        hooks: {
            // Before creating a user, hash the password
            beforeCreate: async (user) => {
                if (user.password) {
                    await user.hashPassword();
                }
            },
            // Before updating a user, hash the password if it has changed
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    await user.hashPassword();
                }
            }
        },
        modelName: 'User'
    });
    return User;
}

