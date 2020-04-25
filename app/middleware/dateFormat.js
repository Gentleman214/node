function dateFormat (value, formatStr, pretty, serveTime) {
  let self = new Date(value)
  let str = formatStr
  let Week = ['日', '一', '二', '三', '四', '五', '六']

  if (self instanceof Date && isNaN(self.getTime())) {
    return ''
  }

  str = str.replace(/yyyy|YYYY/, self.getFullYear())
  str = str.replace(/yy|YY/, (self.getYear() % 100) > 9 ? (self.getYear() % 100).toString() : '0' + (self.getYear() % 100))

  str = str.replace(/MM/, (self.getMonth() + 1) > 9 ? (self.getMonth() + 1).toString() : '0' + (self.getMonth() + 1))
  str = str.replace(/M/g, (self.getMonth() + 1))

  str = str.replace(/w|W/g, Week[self.getDay()])

  str = str.replace(/dd|DD/, self.getDate() > 9 ? self.getDate().toString() : '0' + self.getDate())
  str = str.replace(/d|D/g, self.getDate())

  str = str.replace(/hh|HH/, self.getHours() > 9 ? self.getHours().toString() : '0' + self.getHours())
  str = str.replace(/h|H/g, self.getHours())
  str = str.replace(/mm/, self.getMinutes() > 9 ? self.getMinutes().toString() : '0' + self.getMinutes())
  str = str.replace(/m/g, self.getMinutes())

  str = str.replace(/ss|SS/, self.getSeconds() > 9 ? self.getSeconds().toString() : '0' + self.getSeconds())
  str = str.replace(/s|S/g, self.getSeconds())

  if (pretty === 'pretty') { // 人性化时间
    let now = serveTime || new Date()
    let differ = (now - self) / 1000
    let indexOfH = formatStr.indexOf('h') === -1 ? formatStr.indexOf('H') : formatStr.indexOf('h')
    if (now.getDate() === self.getDate() && now.getMonth() === self.getMonth()) {
      str = '今天'
      if (indexOfH > -1) { // 有小时则可以显示
        if (differ < 60 && differ > 0) {
          str = '刚刚'
        } else if (differ >= 60 && differ < 3600) {
          str = parseInt(differ / 60) + '分钟前'
        } else if (differ >= 3600 && parseInt(differ / 3600) <= now.getHours()) {
          str = parseInt(differ / 3600) + '小时前'
        } else if (-differ >= 60 && -differ < 3600) {
          str = -parseInt(differ / 60) + '分钟后'
        } else if (-differ >= 3600 && -parseInt(differ / 3600) <= (24 - now.getHours())) {
          str = -parseInt(differ / 3600) + '小时后'
        }
      }
    } else if (now.getDate() - self.getDate() === 1 && now.getMonth() === self.getMonth()) {
      str = '昨天'
      if (indexOfH > -1) {
        // str += self.format(formatStr.substr(indexOfH))
        str += dateFormat(self.getTime(), formatStr.substr(indexOfH))
      }
    } else if (now.getDate() - self.getDate() === 2 && now.getMonth() === self.getMonth()) {
      str = '前天'
      if (indexOfH > -1) {
        // str += self.format(formatStr.substr(indexOfH))
        str += dateFormat(self.getTime(), formatStr.substr(indexOfH))
      }
    } else if (now.getDate() - self.getDate() === -1 && now.getMonth() === self.getMonth()) {
      str = '明天'
      if (indexOfH > -1) {
        // str += self.format(formatStr.substr(indexOfH))
        str += dateFormat(self.getTime(), formatStr.substr(indexOfH))
      }
    } else if (now.getDate() - self.getDate() === -2 && now.getMonth() === self.getMonth()) {
      str = '后天'
      if (indexOfH > -1) {
        // str += self.format(formatStr.substr(indexOfH))
        str += dateFormat(self.getTime(), formatStr.substr(indexOfH))
      }
    } else if (self.getFullYear() === now.getFullYear()) {
      if (formatStr.indexOf('M') > -1) {
        formatStr = formatStr.substr(formatStr.indexOf('M'))
        // str = self.format(formatStr)
        str = dateFormat(self.getTime(), formatStr)
      }
    } else if (self.getFullYear() - now.getFullYear() === 1) {
      str = '明年'
      if (formatStr.indexOf('M') > -1) {
        formatStr = formatStr.substr(formatStr.indexOf('M'))
        if (now.getMonth() === 11) { // 12月不显示明年
          // str = self.format(formatStr)
          str = dateFormat(self.getTime(), formatStr)
        } else {
          // str += self.format(formatStr)
          str += dateFormat(self.getTime(), formatStr)
        }
      }
    } else if (self.getFullYear() - now.getFullYear() === -1) {
      str = '去年'
      if (formatStr.indexOf('M') > -1) {
        formatStr = formatStr.substr(formatStr.indexOf('M'))
        // str += self.format(formatStr)
        str += dateFormat(self.getTime(), formatStr)
      }
    }
  }
  return str
}

module.exports = dateFormat