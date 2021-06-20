
const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const User= sequelize.define('users',{
        username: {
            type: Sequelize.STRING
          },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        }
    });
    return User;
}