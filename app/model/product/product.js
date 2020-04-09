const Sequelize = require('sequelize')
const sequelize = require('../index')

var Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER(10),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }, // 商品id
  name: {
    type: Sequelize.STRING(128),
    allowNull: false
  }, // 商品名
  category: Sequelize.STRING(50), // 分类名
  category_id: Sequelize.INTEGER(10), // 分类id
  supplier_id: {
    type: Sequelize.INTEGER(10),
    allowNull: false
  }, // 供应商id
  supplier_name: Sequelize.STRING(50), // 供应商名
  stock_num: Sequelize.INTEGER(20), // 库存数量
  place: Sequelize.STRING(128), // 产地
  spec: Sequelize.STRING(64), // 商品规格
  place: Sequelize.STRING(64), // 商品包装
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = Category