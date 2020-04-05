const User = require('../../model/user/user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 登录
var login = function (form) {
  return User.findOne({
    where: {
      staff_id: form.staffId,
      password: form.password
    }
  })
}

// 获取用户信息，完整信息
var getUserInfoByStaffId = function (staffId) {
  return User.findOne({
    where: {
      staff_id: staffId
    },
    attributes: { exclude: ['password', 'is_default_password'] }
  })
}

// 获取用户信息，简单信息（为了前端设store）
var getSimpleUserInfoByStaffId  = function (staffId) {
  return User.findOne({
    where: {
      staff_id: staffId
    },
    attributes: [ ['staff_id', 'staffId'], 'name', 'authority' ]
  })
}

// 修改密码时效验旧密码是否相同
var checkPassword = function (params) {
  return User.findOne({
    where: {
      staff_id: params.staffId,
      password: params.password
    }
  })
}

// 修改密码
var changePassword = function (params) {
  return User.update({ password: params.password, is_default_password: 0 }, {
    where: {
      staff_id: params.staffId
    }
  })

}

// 分页查询用户信息
var getUserInfo = function (params) {
  let offset = (params.current - 1) * params.size || 0
  let limit = params.size || 10
  let staffId = params.staffId
  let name = params.name
  let authority = params.authority
  let startTime = params.dateRange[0] || '1950-01-01'
  let endTime = params.dateRange[1] || '2030-12-31'
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
      },
      hiredate: {
        [Op.between]: [startTime, endTime]
      }
    },
    offset,
    limit: limit,
    attributes: [ ['staff_id', 'staffId'], 'name', 'gender', 'hiredate', 'phone', 'birthday', 'authority' ]
  })
}

// 关键字搜索（工号/姓名），权限管理页面搜索用户
var getUserByStaffIdOrName = function (keywords) {
  return User.findAll({
    where: {
      [Op.or]: [
        {
          staff_id: {
            [Op.like]:'%' + keywords + '%'
          }
        },
        {
          name: {
            [Op.like]:'%' + keywords + '%'
          }
        }
      ]
    },
    attributes: [ ['staff_id', 'staffId'], 'name' ]
  })
}

// 新增或编辑用户信息
var addOrUpdateUserInfo = function (params) {
  if(!params.staff_id) {
    return User.create({
      password: '000000',
      name: params.name,
      gender: params.gender,
      phone: params.phone,
      head_pic: params.head_pic,
      authority: params.authority,
      birthday: params.birthday,
      hiredate: params.hiredate,
      role: params.role,
      is_default_password: 1
    })
  } else {
    return User.update({
      name: params.name,
      gender: params.gender,
      phone: params.phone,
      head_pic: params.head_pic,
      authority: params.authority,
      birthday: params.birthday,
      hiredate: params.hiredate,
      role: params.role
    }, {
      where: {
        staff_id: params.staff_id
      }
    })
  }
}

// 删除/注销用户
var deleteUserById = function (id) {
  return User.destroy({
    where: {
      id: id
    }
  })
}

var userService = {
  login, // 登陆
  getUserInfoByStaffId, // 获取单个用户信息（完整信息）
  getSimpleUserInfoByStaffId, // 获取单个用户信息（简单信息）
  getUserInfo, // 分页获取用户信息
  getUserByStaffIdOrName, // 关键字搜索（工号/姓名），权限管理页面搜索用户
  checkPassword, // 修改密码时效验旧密码是否对
  changePassword, // 修改密码
  addOrUpdateUserInfo, // 新增或编辑用户信息
  deleteUserById // 删除/注销用户
}
module.exports = userService


