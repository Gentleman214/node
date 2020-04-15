const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const storehouseService = require('../../service/storehouse/storehouse')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 查询所有仓库信息
app.post('/api/storehouse/list', (req, res) => {
  storehouseService.getAllStorehouse().then(data => {
    res.json(resBody(200, data.rows))
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

// 新增或编辑仓库信息
app.post('/api/storehouse/addoredit', (req, res) => {
  storehouseService.addOrUpdateStorehouse(req.body).then(data => {
    res.json({ code: 200, userMsg: '保存成功'})
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

module.exports = app