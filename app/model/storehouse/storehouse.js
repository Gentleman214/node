const Sequelize = require('sequelize')
const sequelize = require('../index')

var Storehouse = sequelize.define('storehouse', {
  id: {
    type: Sequelize.INTEGER(10),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }, // id
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }, // 仓库名
  address: Sequelize.STRING(128), // 地址
  admin: Sequelize.STRING(20),
  tel: Sequelize.STRING(11), // 联系电话
  area: Sequelize.INTEGER(64),
  state: Sequelize.STRING(5),
  shelves: Sequelize.INTEGER(20), // 货架数
  spec: Sequelize.STRING(255)
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = Storehouse