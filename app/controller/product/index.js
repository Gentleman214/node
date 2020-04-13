const category = require('./category')
const product = require('./product')
const bill = require('./bill')

var productCotroller = {
  category,
  product,
  bill
}

module.exports = productCotroller