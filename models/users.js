const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('../util/dataBase')

const User = sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:DataTypes.STRING,
    phno:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:DataTypes.STRING,
    ispremiumuser: Sequelize.BOOLEAN
})

module.exports = expenseApp