const Sequelize = require('sequelize')
const sequelize = require('../index')

var Bill = sequelize.define('bill', {
  id: {
    type: Sequelize.INTEGER(20),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }, // id
  type: {
    type: Sequelize.INTEGER(1),
    allowNull: false
  }, // 账单类型，1入库单 2出库单
  product_id: Sequelize.INTEGER(10), // 商品编号
  product_name: Sequelize.STRING(128), // 商品名
  product_num: Sequelize.INTEGER(20), // 入出库数量
  product_price: Sequelize.FLOAT(10, 2), // 单价
  time: {
    type: Sequelize.DATE(),
    defaultValue: Date.now()
  }, // 操作时间
  operator_id: Sequelize.INTEGER(5),
  operator_name: Sequelize.STRING(20)
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = Bill