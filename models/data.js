const { DataTypes } = require('sequelize')
const sequelize = require('../util/dataBase')

const expenseApp = sequelize.define('expenseApp',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    expenseamount:{
        type:DataTypes.INTEGER,
        allowNull:false 
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = expenseApp