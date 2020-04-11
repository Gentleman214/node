const Product = require('../../model/product/product')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 分页查询商品信息
var getProductList = function (params) {
  let offset = (params.current - 1) * params.size || 0
  let limit = params.size || 10
  let name = params.name || ''
  let category_id = params.category || ''
  let supplier = params.supplier
  if (supplier.length) {
    return Product.findAndCountAll({
      where: {
        name: {
          [Op.like]:'%' + name + '%'
        },
        category_id: {
          [Op.like]: category_id + '%'
        },
        supplier_id: {
          [Op.in]: supplier
        }
      },
      offset,
      limit: limit,
      attributes: { exclude: ['category_id', 'supplier_id'] }
    })
  } else {
    return Product.findAndCountAll({
      where: {
        name: {
          [Op.like]:'%' + name + '%'
        },
        category_id: {
          [Op.like]: category_id + '%'
        }
      },
      offset,
      limit: limit,
      attributes: { exclude: ['category_id', 'supplier_id'] }
    })
  }
}

var productService = {
  getProductList // 分页获取商品信息信息
}
module.exports = productService


