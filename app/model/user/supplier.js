const Sequelize = require('sequelize')
const sequelize = require('../index')

var Supplier = sequelize.define('supplier', {
  id: {
    type: Sequelize.STRING(10),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }, // id
  name: Sequelize.STRING(50), // 供应商名称
  tel: Sequelize.STRING(20), // 固话
  address: Sequelize.STRING(50), // 地址
  contact_person: Sequelize.STRING(50), // 联系人
  contact_phone: Sequelize.STRING(11) // 联系电话
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = Supplier