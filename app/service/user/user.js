const User = require('../../model/user/user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var login = function (form) {
  return User.findOne({
    where: {
      staff_id: form.staffId,
      password: form.password
    }
  })
}

var getUserInfoByStaffId = function (staffId) {
  return User.findOne({
    where: {
      staff_id: staffId
    }
  })
}

var getUserInfo = function (params) {
  let offset = (params.current - 1) * params.size || 0
  let limit = params.size || 10
  let staffId = params.staffId || ''
  let name = params.name || ''
  let authority = params.authority || ''
  return User.findAndCountAll({
    where: {
      staff_id: {
        [Op.like]:'%' + staffId + '%'
      },
      name: {
        [Op.like]:'%' + name + '%'
      },
      authority: {
        [Op.like]:'%' + authority + '%'
      }
    },
    offset,
    limit: limit,
    attributes: [ ['staff_id', 'staffId'], 'name', 'gender', 'phone', 'age', 'authority' ]
  })
}

var updateUserInfoById = function (form) {
  return User.update({
    name: form.name,
    password: form.password
  }, {
    where: {
      id: form.id
    }
  })
}

var deleteUserById = function (id) {
  return User.destroy({
    where: {
      id: id
    }
  })
}

var userService = {
  login,
  getUserInfoByStaffId,
  getUserInfo,
  updateUserInfoById,
  deleteUserById
}
module.exports = userService


