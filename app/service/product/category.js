const Category = require('../../model/product/category')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 商品分类查询
var getProductCategory = function () {
  return Category.findAll({
    attributes: [ 'id', 'name', 'parent_id', 'level' ]
  })
}


var categoryService = {
  getProductCategory // 商品分类查询
}
module.exports = categoryService


