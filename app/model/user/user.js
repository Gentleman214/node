const Sequelize = require('sequelize')
const sequelize = require('../index')

var User = sequelize.define('user',{
  staff_id: {
    type: Sequelize.STRING(20),
    primaryKey: true
  },
  password: Sequelize.STRING(20),
  name: Sequelize.STRING(20)
},
{
  timestamps: false,
  freezeTableName: true
})

module.exports = User