const Code = [
  200, // 请求成功
  404, // (客户端问题)请求的资源没有找到
  500 // 服务器错误
]

var setResponseBody = function(code, data='') {
  switch (code) {
    case Code[0]:
      return {
        code: 200,
        msg: '成功',
        data: data
      }
      break
    case Code[1]:
      return {
        code: 404,
        msg: '请求的资源没有找到'
      }
      break
    case Code[2]:
      return {
        code: 500,
        msg: '服务器错误'
      }
    default:
      break
  }
}

module.exports = setResponseBody