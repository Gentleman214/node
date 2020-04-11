const Supplier = require('../../model/user/supplier')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 分页查询供应商信息
var getSupplier = function (params) {
  let offset = (params.current - 1) * params.size || 0
  let limit = params.size || 10
  let name = params.name
  return Supplier.findAndCountAll({
    where: {
      name: {
        [Op.like]: '%' + name + '%'
      }
    },
    offset,
    limit: limit
  })
}

// 获取供应商列表（只需要id和name,主要为了下拉选择框初始化数据）
var getSupplierSimpleList = function () {
  return Supplier.findAll({
    attributes: ['id', 'name']
  })
}

var getSupplierInfoById = function (id) {
  return Supplier.findOne({
    where: {
      id: id
    }
  })
}

var addOrUpdateSupplier = function (params) {
  if (params.id) {
    return Supplier.update({
      name: params.name,
      tel: params.tel,
      address: params.address,
      contact_person: params.contact_person,
      contact_phone: params.contact_phone
    },
      {
        where: {
          id: params.id
        }
      })
  } else {
    return Supplier.create({
      name: params.name,
      tel: params.tel || '',
      address: params.address,
      contact_person: params.contact_person,
      contact_phone: params.contact_phone
    })
  }
}

var deleteSupplierById = function (id) {
  return Supplier.destroy({
    where: {
      id: id
    }
  })
}

var supplierService = {
  getSupplier,
  getSupplierSimpleList,
  getSupplierInfoById,
  addOrUpdateSupplier,
  deleteSupplierById
}
module.exports = supplierService


