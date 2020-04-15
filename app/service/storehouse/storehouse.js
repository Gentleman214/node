const Storehouse = require('../../model/storehouse/storehouse')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 获取所有仓库信息
var getAllStorehouse = function () {
  return Storehouse.findAndCountAll()
}


var addOrUpdateStorehouse = function (params) {
  if (params.id) {
    return Storehouse.update({
      name: params.name,
      address: params.address,
      admin: params.admin,
      tel: params.tel,
      area: params.area,
      state: params.state,
      shelves: params.shelves,
      spec: params.spec
    },
      {
        where: {
          id: params.id
        }
      })
  } else {
    return Storehouse.create({
      name: params.name,
      address: params.address,
      admin: params.admin,
      tel: params.tel,
      area: params.area,
      state: params.state,
      shelves: params.shelves,
      spec: params.spec
    })
  }
}

var storehouseService = {
  getAllStorehouse,
  addOrUpdateStorehouse
}
module.exports = storehouseService
