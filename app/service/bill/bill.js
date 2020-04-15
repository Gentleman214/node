const Bill = require('../../model/bill/bill')
const Product = require('../../model/product/product')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 新增入库单或出库单
var addBill = function (params) {
  let promise1 = Bill.create({
    type: params.type,
    product_id: params.product_id,
    product_name: params.product_name,
    product_num: params.product_num,
    product_price: params.product_price,
    operator_id: params.operator_id,
    operator_name: params.operator_name
  })
  let promise2
  if (params.type === 1) {
    promise2 = Product.increment({
      stock_num: params.product_num
    }, {
      where: {
        id: params.product_id
      }
    })
  }
  if (params.type === 2) {
    promise2 = Product.increment({
      stock_num: -params.product_num
    }, {
      where: {
        id: params.product_id
      }
    })
  }
  return Promise.all([promise1, promise2])
}

// 分页查询入库单和出库单
var getBillList = function (params) {
  let offset = (params.current - 1) * params.size || 0
  let limit = params.size || 10
  let type = params.type
  let product = params.product || ''
  let operator = params.operator || ''
  let startTime = params.startTime || '1950-01-01 00:00:00'
  let endTime = params.endTime || '2030-12-31 23:59:59'
  return Bill.findAndCountAll({
    where: {
      type: type,
      [Op.and]: [
        {
          [Op.or]: [
            {
              product_id: {
                [Op.like]: '%' + product + '%'
              },
            },
            {
              product_name: {
                [Op.like]: '%' + product + '%'
              }
            }
          ]
        },
        {
          [Op.or]: [
            {
              operator_id: {
                [Op.like]: '%' + operator + '%'
              },
            },
            {
              operator_name: {
                [Op.like]: '%' + operator + '%'
              }
            }
          ]
        }
      ],
      time: {
        [Op.between]: [startTime, endTime]
      }
    },
    offset,
    limit: limit
  })
}

// 近一周销量统计
var salesVolumeStatistics = function (type) {
  let now = new Date().toLocaleString()
  let promiseList = []
  for (let i = 7; i >= 0; i--) {
    promiseList.push(Bill.findAll({
      where: {
        type: type,
        time: {
          [Op.lt]: new Date(new Date(now) - i * 24 * 60 * 60 * 1000),
          [Op.gt]: new Date(new Date(now) - (i+1)* 24 * 60 * 60 * 1000)
        }
      },
      attributes: [['product_num', 'num']]
    }))
  }
  return Promise.all(promiseList)
}


var billService = {
  addBill,
  getBillList,
  salesVolumeStatistics
}
module.exports = billService


