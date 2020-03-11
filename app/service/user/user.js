const User = require('../../model/user/user')

var getUserInfoByStaffId = function(id) {
  return User.findAll({
    where: {
      staffId: id
    }
  })
 }

 var login = function(form) {
  return User.findAll({
    where: {
      staffId: form.staffId,
      password: form.password
    }
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
    getUserInfoByStaffId,
    login,
    updateUserInfoById,
    deleteUserById
 }
module.exports = userService


