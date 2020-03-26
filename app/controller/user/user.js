const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userService = require('../../service/user/user')
const resBody = require('../../middleware/responseBody')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 登录
app.post('/api/user/login', function (req, res, next) {
  let loginForm = {
    "staffId": req.body.staffId,
    "password": req.body.password
  }
  userService.login(loginForm).then((data) => {
    if (data && data.staff_id) {
      let payload = {
        staffId: req.body.staffId
      }
      let token = jwt.sign(payload, secret, {
        expiresIn: 60 * 60 * 1  // 1小时过期
      })
      let shouldModifyDefaultPassword = data.is_default_password === 1
      let isManage = data.authority === 1
      let resData = {
        token: token,
        staffId: data.staff_id,
        name: data.name,
        modify: shouldModifyDefaultPassword,
        isManage: isManage
      }
      res.json(resBody(200, resData, '登录成功'))
    } else {
      res.json(resBody(401, null, '用户名或密码错误'))
    }
  })
    .catch(err => {
      res.json(resBody(500))
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
    res.json({ code: 403, succeed: false, msg: 'invalid token' })
  }
  if (staffId) {
    userService.getUserInfoByStaffId(staffId).then(data => {
      if (data && data.staff_id) {
        res.json({ code: 200, succeed: true })
      } else {
        res.json({ code: 401, succeed: false, msg: 'invalid token' })
      }
    })
  } else {
    res.json({ code: 401, succeed: false, msg: 'invalid token' })
  }
})

// 改密码时效验旧密码是否正确
app.post('/api/user/checkPassword', (req, res, next) => {
  userService.checkPassword(req.body).then(data => {
    if (data && data.staff_id) {
      res.json({ code: 200, flag: true, userMsg: '' })
    } else {
      res.json({ code: 200, flag: false, userMsg: '原密码输入错误' })
    }
  })
})

// 修改密码
app.post('/api/user/changePassword', (req, res, next) => {
  userService.changePassword(req.body).then(data => {
    if (data && data[0] === 1) {
      res.json({ code: 200, userMsg: '修改成功' })
    } else {
      res.json({ code: 500, userMsg: '修改失败' })
    }
  })
})

// 单个查询(基础信息：姓名工号等)
app.get('/api/user/info/:staffId', function (req, res) {
  userService.getSimpleUserInfoByStaffId(req.params.staffId).then(data => {
    res.json(resBody(200, data))
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

// 单个查询
app.get('/api/user/:staffId', function (req, res) {
  userService.getUserInfoByStaffId(req.params.staffId).then(data => {
    if (data && data.staff_id) {
      res.json(resBody(200, data))
    } else {
      res.json({ code: 204, userMsg: '未查询到该用户的信息' })
    }
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

// 查询所有（分页查询）
app.post('/api/user', (req, res) => {
  userService.getUserInfo(req.body).then(data => {
    res.json(resBody(200, { 'records': data.rows, 'total': data.count }))
  })
    .catch(err => {
      res.json(resBody(500))
      // console.log(err)
    })
})

// 新增或编辑用户信息
app.post('/api/user/addOrUpdate', function (req, res, next) {
  userService.addOrUpdateUserInfo(req.body).then(data => {
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
