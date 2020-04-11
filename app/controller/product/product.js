const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const productService = require('../../service/product/product')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 分页查询商品信息
app.post('/api/product/list', (req, res) => {
  productService.getProductList(req.body).then(data => {
    res.json(resBody(200, { 'records': data.rows, 'total': data.count }))
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

module.exports = app