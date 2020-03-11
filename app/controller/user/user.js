const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userService = require('../../service/user/user')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.get('/api/user/:id', function (req, res) {
  userService.getUserInfoByStaffId(req.params.id).then(data => {
    res.json(resBody(200, data))
  })
  .catch(err => {
    res.json(resBody(500))
    console.log(err)
  })
 /*  .finally( () => {
    sequelize.close()
  }) */
})

app.post('/api/user/login', function (req, res, next) {
let loginForm = {
    "staffId": req.body.staffId,
    "password": req.body.password
  }
   userService.login(loginForm).then((data) => {
    if (data.length) {
      let content = {
        name:req.body.staffId
      }
      let secretOrPrivateKey="jwt";// 这是加密的key（密钥）
      let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60*60*1  // 1小时过期
              })
      res.json({code:200,msg:'ok',token:token,staffId:req.body.staffId})
    } else {
      res.send('用户名或密码错误')
    }
  })
  .catch(err => {
    res.json(resBody(500))
    console.log(err)
  })
 /*  .finally( () => {
    sequelize.close()
  }) */
})

app.post('/api/user/update', function (req, res, next) {
  let updateForm = {
      "id": req.body.id,
      "name": req.body.name,
      "password": req.body.password
    }
     userService.updateUserInfoById(updateForm).then((data) => {
      res.json(resBody(200, data.dataValues))
    })
    .catch(err => {
      res.json(resBody(500))
      console.log(err)
    })
  })

  app.post('/api/user/delete', function (req, res, next) {
    let id = req.body.id
    userService.deleteUserById(id).then((data) => {
        res.json(resBody(200))
      })
      .catch(err => {
        res.json(resBody(500))
        console.log(err)
      })
    })

module.exports = app
