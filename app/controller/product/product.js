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

// 根据id获取商品信息
app.get('/api/product/:id', (req, res) => {
  productService.getProductInfoById(req.params.id).then(data => {
    if (data) {
      res.json(resBody(200, data))
    } else {
      res.json({ code: 204, userMsg: '未查询到该商品信息' })
    }
  }).catch(err => {
    res.json(resBody(500))
  })
})

// 新增或编辑商品信息
app.post('/api/product/addOrUpdate', (req, res) => {
  productService.addOrUpdateProduct(req.body).then(data => {
    if (data.dataValues) {
      res.json(resBody(200, data.dataValues, '保存成功'))
    } else {
      res.json(resBody(200, req.body, '保存成功'))
    }
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

// 关键字搜索（商品编号/商品名）
app.get('/api/product/keywords/:keywords', (req, res) => {
  productService.getProductByIdOrName(req.params.keywords).then(data => {
    let resData = []
    JSON.parse(JSON.stringify(data)).forEach(item => {
      resData.push(`${item.id}-${item.name}`)
    })
    res.json(resBody(200, resData))
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

module.exports = app