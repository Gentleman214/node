const express = require('express')
const app = new express()
const userController = require('./app/controller/user/index')
const productCotroller = require('./app/controller/product/index')

app.use(userController.user)
app.use(userController.role)
app.use(userController.supplier)
app.use(productCotroller.category)
app.use(productCotroller.product)

/*切记端口号和前端项目端口号一样时，别同时启动前后端，此时端口占用，会报错，建议前后端端口号别一致*/
app.listen(3001, () => console.log('app is starting in port 3001...'))