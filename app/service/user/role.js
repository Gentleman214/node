const Role = require('../../model/user/role')
const Menu = require('../../model/user/menu')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 查询
var getRoleList = function () {
  return Role.findAndCountAll()
}

var getMenu = function () {
  return Menu.findAll({
    where: {
      pid: '0'
    },
    attributes: [ ['id', 'key'], ['pid', 'parentId'], ['name', 'title'], ['index', 'sortIndex'],'children', 'icon' ]
  })
}

var getMenuChildren = function (arr) {
  let sqlQueue = []
  arr.forEach(item => {
    sqlQueue.push(Menu.findOne({
      where: {
        id: item
      },
      attributes: [ ['id', 'key'], ['pid', 'parentId'], ['name', 'title'], ['index', 'sortIndex'],'children', 'icon' ]
    }))
  })
  return Promise.all(sqlQueue)
}

var roleService = {
  getRoleList, // 查询
  getMenu, // 获取菜单
  getMenuChildren // 获取子元素
}
module.exports = roleService


