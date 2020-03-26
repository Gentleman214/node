const Sequelize = require('sequelize')
const sequelize = require('../index')

var User = sequelize.define('user', {
  staff_id: {
    type: Sequelize.INTEGER(5),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }, // 员工号,主键,自增，不为空
  password: Sequelize.STRING(20), // 密码
  name: Sequelize.STRING(20), // 姓名
  gender: Sequelize.STRING(2), // 性别
  phone: Sequelize.STRING(11), // 电话
  head_pic: Sequelize.STRING(255), // 头像
  authority: Sequelize.INTEGER(1), // 权限id 0管理员 1默认角色
  is_default_password: Sequelize.TINYINT(1), // 是否是默认密码，1是，0否
  birthday: Sequelize.DATE(), // 出生日期
  hiredate: Sequelize.DATE(), // 入职日期
  role: Sequelize.STRING(20) // 角色，职位
},
  {
    timestamps: false,
    freezeTableName: true
  })

module.exports = User