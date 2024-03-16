'use strict';

const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = (sequelize) => {
    class User extends Model {
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

        async comparePassword(pass) {
            console.log('the hash is', this.password);
            console.log('the PASS is', pass);

            return bcrypt.compare(pass, this.password);
        };
    }

    User.init({

        login: {
            type: DataTypes.STRING,
            allowNull: false, // constraint level validation (SQL level validation)
            unique: true

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
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    await user.hashPassword();
                }
            },
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

