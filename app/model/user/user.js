const Sequelize = require('sequelize')
const sequelize = require('../index')

var User = sequelize.define('user', {
  staff_id: {
    type: Sequelize.STRING(20),
    primaryKey: true
  },
  password: Sequelize.STRING(20),
  name: Sequelize.STRING(20),
  gender: Sequelize.STRING(2),
  phone: Sequelize.STRING(11),
  age: Sequelize.INTEGER(3),
  authority: Sequelize.INTEGER(1),
  is_default_password: Sequelize.TINYINT(1)
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = User