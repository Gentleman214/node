const express = require('express')
const app = new express()
const userController = require('./app/controller/user/user')
const roleController = require('./app/controller/user/role')

app.use(userController)
app.use(roleController)

/*切记端口号和前端项目端口号一样时，别同时启动前后端，此时端口占用，会报错，建议前后端端口号别一致*/
app.listen(3001, () => console.log('app is starting in port 3001...'))