const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const roleService = require('../../service/user/role')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/role/list', (req, res) => {
  roleService.getRoleList().then(data => {
    res.json(resBody(200, data.rows, '请求成功'))
  }).catch(err => {
    res.json(resBody(500))
  })
})

module.exports = app