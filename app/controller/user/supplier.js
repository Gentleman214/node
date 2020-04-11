const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const supplierService = require('../../service/user/supplier')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/supplier/list', (req, res) => { // 获取供应商列表列表
  supplierService.getSupplier(req.body).then(data => {
    res.json(resBody(200, { 'records': data.rows, 'total': data.count }))
  }).catch(err => {
    res.json(resBody(500))
  })
})

// 获取供应商列表（只需要id和name,主要为了下拉选择框初始化数据）
app.post('/api/supplier/simpleList', (req, res) => {
  supplierService.getSupplierSimpleList().then(data => {
    res.json(resBody(200, data))
  })
})

app.get('/api/supplier/:id', (req, res) => {
  supplierService.getSupplierInfoById(req.params.id).then(data => {
    res.json(resBody(200, data))
  }).catch(err => {
    res.json(resBody(500))
  })
})

app.post('/api/supplier/addOrUpdate', (req, res) => {
  supplierService.addOrUpdateSupplier(req.body).then(data => {
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

app.post('/api/supplier/delete', function (req, res, next) {
  let id = req.body.id
  supplierService.deleteSupplierById(id).then((data) => {
    res.json(resBody(200, null, '删除成功'))
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

module.exports = app