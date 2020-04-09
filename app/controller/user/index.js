const user = require('./user')
const role = require('./role')
const supplier = require('./supplier')

var userCotroller = {
  user,
  role,
  supplier
}

module.exports = userCotroller