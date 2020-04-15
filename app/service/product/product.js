const Product = require('../../model/product/product')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 分页查询商品信息
var getProductList = function (params) {
  let offset = (params.current - 1) * params.size || 0
  let limit = params.size || 10
  let id = params.id || ''
  let name = params.name || ''
  let category_id = params.category || ''
  let supplier = params.supplier
  if (supplier.length) {
    return Product.findAndCountAll({
      where: {
        id: {
          [Op.like]: id + '%'
        },
        name: {
          [Op.like]: '%' + name + '%'
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
        id: {
          [Op.like]: id + '%'
        },
        name: {
          [Op.like]: '%' + name + '%'
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

// 根据ID获取商品信息
var getProductInfoById = function (id) {
  return Product.findOne({
    where: {
      id: id
    }
  })
}

// 新增或编辑商品信息
var addOrUpdateProduct = function (params) {
  if (params.id) {
    return Product.update({
      name: params.name,
      category: params.category,
      category_id: params.category_id,
      supplier_id: params.supplier_id,
      supplier_name: params.supplier_name,
      stock_num: params.stock_num,
      place: params.place,
      spec: params.spec,
      pack: params.pack,
      unit: params.unit,
      price: params.price,
      remark: params.remark,
      manufacture_date: params.manufacture_date,
      expiration_date: params.expiration_date,
      quality_guarantee_period: params.quality_guarantee_period
    },
      {
        where: {
          id: params.id
        }
      })
  } else {
    return Product.create({
      name: params.name,
      category: params.category,
      category_id: params.category_id,
      supplier_id: params.supplier_id,
      supplier_name: params.supplier_name,
      stock_num: params.stock_num,
      place: params.place,
      spec: params.spec,
      pack: params.pack,
      unit: params.unit,
      price: params.price,
      remark: params.remark,
      manufacture_date: params.manufacture_date,
      expiration_date: params.expiration_date,
      quality_guarantee_period: params.quality_guarantee_period
    })
  }
}

// 关键字（商品编号和商品名）搜索商品
var getProductByIdOrName = function (keywords) {
  return Product.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: '%' + keywords + '%'
          }
        },
        {
          name: {
            [Op.like]: '%' + keywords + '%'
          }
        }
      ]
    },
    attributes: ['id', 'name']
  })
}

// 库存盘点
var checkStock = function (params) {
  let offset = (params.current - 1) * params.size || 0
  let limit = params.size || 10
  let type = params.type
  let num = params.num
  if (type === 1) {
    return Product.findAndCountAll({
      where: {
        stock_num: {
          [Op.lte]: num
        }
      },
      offset,
      limit: limit,
      attributes: ['id', 'name', 'category', ['supplier_name', 'supplier'], 'stock_num']
    })
  }
  if (type === 2) {
    return Product.findAndCountAll({
      where: {
        [Op.and]: [
          {
            stock_num: {
              [Op.gt]: num[0]
            }
          },
          {
            stock_num: {
              [Op.lt]: num[1]
            }
          }
        ]
      },
      offset,
      limit: limit,
      attributes: ['id', 'name', 'category', ['supplier_name', 'supplier'], 'stock_num']
    })
  }
  if (type === 3) {
    return Product.findAndCountAll({
      where: {
        stock_num: {
          [Op.gte]: num
        }
      },
      offset,
      limit: limit,
      attributes: ['id', 'name', 'category', ['supplier_name', 'supplier'], 'stock_num']
    })
  }
}

var productService = {
  getProductList, // 分页获取商品信息信息
  getProductInfoById,
  addOrUpdateProduct,
  getProductByIdOrName,
  checkStock
}
module.exports = productService


