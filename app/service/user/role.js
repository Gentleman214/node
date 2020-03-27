const Role = require('../../model/user/role')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 查询
var getRoleList = function (form) {
  return Role.findAndCountAll({})
}

var roleService = {
  getRoleList // 查询
}
module.exports = roleService


