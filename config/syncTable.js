/**
 * 
 * 同步表结构
 * node config/syncTable.js
 */

var usertable = require('./model/user/user.js')

// 同步表结构
usertable.sync({
    force: true  // 强制同步，先删除表，然后新建
})