const Sequelize = require('sequelize')
const sequelize = require('../index')

var Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER(2),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }, // 编号
  name: Sequelize.STRING(20), // 名字
  menu: Sequelize.STRING(255) // 可操作的菜单
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = Role