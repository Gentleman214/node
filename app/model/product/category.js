const Sequelize = require('sequelize')
const sequelize = require('../index')

var Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER(10),
    primaryKey: true,
    allowNull: false
  }, // id
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }, // 分类名称
  level: {
    type: Sequelize.INTEGER(1),
    allowNull: false
  }, // 分类等级
  parent_id: Sequelize.INTEGER(10) // 父级分类的id
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = Category