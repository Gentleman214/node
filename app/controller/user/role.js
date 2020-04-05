const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const roleService = require('../../service/user/role')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/role/list', (req, res) => { // 获取角色列表
  roleService.getRoleList().then(data => {
    res.json(resBody(200, data.rows, '请求成功'))
  }).catch(err => {
    res.json(resBody(500))
  })
})

app.get('/api/role/menu', (req, res) => { // 获取菜单
  let resData = []
  let parentMenu = []
  let childrenMenu = []
  roleService.getMenu().then(data => {
    resData = JSON.parse(JSON.stringify(data))
    if (resData && resData.length) {
      parentMenu = resData.filter(item => item.parentId === '0')
      childrenMenu = resData.filter(item => item.parentId !== '0')
      if (childrenMenu && childrenMenu.length) {
        parentMenu.forEach((item, index) => {
          item.children = []
          childrenMenu.forEach((subItem, subIndex) => {
            if (subItem.parentId === item.key) {
              parentMenu[index].children.push(subItem)
            }
          })
        })
      }
    }
    console.log(resData)
    resData = parentMenu.filter(item => item.parentId === '0')
    res.json(resBody(200, resData, '请求成功'))
  }).catch(err => {
    console.log(err)
    res.json(resBody(500))
  })
})

app.get('/api/role/menu/:id', (req, res) => { // 根据权限id获取菜单
  let resData = []
  let parentMenu = []
  let childrenMenu = []
  roleService.getMenuByAuthorityId(req.params.id).then(data => {
    resData = JSON.parse(JSON.stringify(data))
    if (resData && resData.length) {
      parentMenu = resData.filter(item => item.parentId === '0')
      childrenMenu = resData.filter(item => item.parentId !== '0')
      if (childrenMenu && childrenMenu.length) {
        parentMenu.forEach((item, index) => {
          item.children = []
          childrenMenu.forEach((subItem, subIndex) => {
            if (subItem.parentId === item.key) {
              parentMenu[index].children.push(subItem)
            }
          })
        })
      }
    }
    resData = parentMenu.filter(item => item.parentId === '0')
    res.json(resBody(200, resData, '请求成功'))
  }).catch(err => {
    res.json(resBody(500))
  })
})
module.exports = app