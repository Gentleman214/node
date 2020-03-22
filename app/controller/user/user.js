const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userService = require('../../service/user/user')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret ="storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.get('/api/user/:staffId', function (req, res) {
  userService.getUserInfoByStaffId(req.params.staffId).then(data => {
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

// 登录
app.post('/api/user/login', function (req, res, next) {
let loginForm = {
    "staffId": req.body.staffId,
    "password": req.body.password
  }
  userService.login(loginForm).then((data) => {
    if (data && data.staff_id) {
      let payload = {
        staffId:req.body.staffId
      }
      let token = jwt.sign(payload, secret , {
                expiresIn: 60*60*1  // 1小时过期
              })
      let resData = {
        token: token,
        staffId: data.staff_id,
        name: data.name
      }
      res.json(resBody(200, resData, '登录成功'))
    } else {
      res.json(resBody(401, null, '用户名或密码错误'))
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

// 效验token是否有效
app.post('/api/user/checkAuth', (req, res, next) => {
  let tokenStr = req.body.token
  let staffId = ''
  try {
    staffId = jwt.verify(tokenStr, secret).staffId
  } catch (e) {
    res.json({code:403, succeed:false, msg:'invalid token'})
  }
  if (staffId) {
    userService.getUserInfoByStaffId(staffId).then(data => {
      if (data && data.staff_id) {
        res.json({code:200,succeed:true})
      } else {
        res.json({code:401,succeed:false, msg:'invalid token'})
      }
    })
  } else {
    res.json({code:401,succeed:false, msg:'invalid token'})
  }
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
