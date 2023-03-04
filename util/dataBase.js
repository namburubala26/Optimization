const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('expense', 'root', '8985@Yash', {
    dialect:'mysql',
    host: 'localhost',
  })

module.exports = sequelize