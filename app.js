const express = require('express')
const app = new express()
const userController = require('./app/controller/user/user')

app.use(userController)

app.listen(3000, () => console.log('app is starting in port 3000...'))