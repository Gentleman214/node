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
  pack: Sequelize.STRING(64), // 商品包装
  unit: Sequelize.STRING(32), // 单位
  price: {
    type: Sequelize.FLOAT(10, 2),
    allowNull: false
  }, // 价格
  remark: Sequelize.STRING(255), // 备注
  manufacture_date: Sequelize.DATE(), // 生产日期
  expiration_date: Sequelize.DATE(), // 过期日期
  quality_guarantee_period: Sequelize.STRING(10) // 保质期
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = Product