const Role = require('../../model/user/role')
const Menu = require('../../model/user/menu')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 查询
var getRoleList = function () {
  return Role.findAndCountAll()
}

var getMenu = function () { // 获取所有菜单
  return Menu.findAll({
    attributes: [ ['id', 'key'], ['pid', 'parentId'], ['name', 'title'], ['index', 'sortIndex'],'children', 'icon', 'link' ]
  })
}


var getMenuByAuthorityId = async function (id) { // 根据权限id获取菜单
  let menu = []
  await Role.findOne({
    where: {
      id: id
    }
  }).then(data => menu = data.dataValues.menu.split(','))
  return Menu.findAll({
    where: {
      id: {
        [Op.in]: menu
      }
    },
    attributes: [ ['id', 'key'], ['pid', 'parentId'], ['name', 'title'], ['index', 'sortIndex'],'children', 'icon', 'link' ]
  })
}
var roleService = {
  getRoleList, // 查询
  getMenu, // 获取所有菜单
  getMenuByAuthorityId // 根据权限ID获取菜单
}
module.exports = roleService


