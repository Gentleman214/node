const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const billService = require('../../service/bill/bill')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 新增入库单或出库单
app.post('/api/product/bill/add', (req, res) => {
  billService.addBill(req.body).then(data => {
    if (data.length === 2) {
      res.json({ code: 200, userMsg: '成功'})
    } else {
      res.json(resBody(500))
    }
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

// 分页查询入库单和出库单
app.post('/api/product/bill/list', (req, res) => {
  billService.getBillList(req.body).then(data => {
    res.json(resBody(200, { 'records': data.rows, 'total': data.count }))
  })
    .catch(err => {
      res.json(resBody(500))
    })
})
module.exports = app