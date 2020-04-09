const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const categoryService = require('../../service/product/category')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/pruduct/category', (req, res) => {
  let resData = []
  let firstLevelCategory = []
  let secondLevelCategory = []
  let thirdLevelCategory = []
  categoryService.getProductCategory().then(data => {
    resData = JSON.parse(JSON.stringify(data))
    firstLevelCategory = resData.filter(item => item.level === 1)
    secondLevelCategory = resData.filter(item => item.level === 2)
    thirdLevelCategory = resData.filter(item => item.level === 3)
    firstLevelCategory.forEach(firstLevelItem => {
      firstLevelItem.children = secondLevelCategory.filter(secondLevelItem => secondLevelItem.parent_id === firstLevelItem.id )
      firstLevelItem.children.forEach(thirdLevelItem => {
        thirdLevelItem.children = thirdLevelCategory.filter(item => item.parent_id === thirdLevelItem.id )
      })
    });
    res.json(resBody(200,firstLevelCategory, '请求成功'))
  }).catch(err => {
    console.log(err)
    res.json(resBody(500))
  })
})

module.exports = app