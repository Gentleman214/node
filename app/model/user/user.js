const Sequelize = require('sequelize')
const sequelize = require('../index')

var User = sequelize.define('user',{
  id: {
    type: Sequelize.INTEGER(6),
    primaryKey: true
  },
  name: Sequelize.STRING(20),
  password: Sequelize.STRING(20)
},
{
  timestamps: false,
  freezeTableName: true
})

module.exports = User