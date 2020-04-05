const Sequelize = require('sequelize')
const sequelize = require('../index')

var Menu = sequelize.define('menu', {
  id: {
    type: Sequelize.STRING(5),
    primaryKey: true,
    allowNull: false
  }, // id
  pid: {
    type: Sequelize.STRING(5),
    allowNull: false
  },
  name: Sequelize.STRING(20), // 名字
  index: Sequelize.INTEGER(2), // 排序值
  icon: Sequelize.STRING(50), // 图标
  children: Sequelize.STRING(255), // 二级菜单
  link: Sequelize.STRING(50) // 路由
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = Menu