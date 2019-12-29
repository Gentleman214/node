const User = require('../../model/user/user')

var getUserInfoById = function(id) {
  return User.findAll({
    where: {
      id: id
    }
  })
 }

 var setUserInfo = function(form) {
  return User.create({
    name: form.name,
    password: form.password
  })
 }

 var updateUserInfoById = function(form) {
   return User.update({
     name: form.name,
     password: form.password
   }, {
     where: {
       id: form.id
     }
   })
 }

 var deleteUserById = function(id) {
   return User.destroy({
     where: {
       id: id
     }
   })
 }

 var userService = {
    getUserInfoById,
    setUserInfo,
    updateUserInfoById,
    deleteUserById
 }
module.exports = userService


