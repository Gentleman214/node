const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userService = require('../../service/user/user')
const resBody = require('../../middleware/responseBody')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.get('/api/user/:id', function (req, res) {
  userService.getUserInfoById(req.params.id).then(data => {
    if(data.length) res.json(resBody(200, data))
    else res.json(resBody(404, data))
  })
  .catch(err => {
    res.json(resBody(500))
    console.log(err)
  })
 /*  .finally( () => {
    sequelize.close()
  }) */
})

app.post('/api/user/register', function (req, res, next) {
let registerForm = {
    "name": req.body.name,
    "password": req.body.password
  }
//   console.log(loginForm)
//var looginForm = JSON.parse(JSON.stringify(req.body))
 // console.log(JSON.parse(JSON.stringify(req.body)).name)
 //res.send('ok')
   userService.setUserInfo(registerForm).then((data) => {
    res.json(resBody(200, data.dataValues))
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
