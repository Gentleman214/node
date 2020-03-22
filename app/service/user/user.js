const User = require('../../model/user/user')

 var login = function(form) {
  return User.findOne({
    where: {
      staff_id: form.staffId,
      password: form.password
    }
  })
 }

 var getUserInfoByStaffId = function(staffId) {
  return User.findOne({
    where: {
      staff_id: staffId
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


