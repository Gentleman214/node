const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const billService = require('../../service/bill/bill')
const resBody = require('../../middleware/responseBody')
const dateFormat = require('../../middleware/dateFormat')
const nodeExcel = require('excel-export')
const jwt = require('jsonwebtoken');  //用来生成token
const secret = "storage_system";// 这是加密的key（密钥）
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 新增入库单或出库单
app.post('/api/product/bill/add', (req, res) => {
  billService.addBill(req.body).then(data => {
    if (data.length === 2) {
      res.json({ code: 200, userMsg: '成功' })
    } else {
      res.json(resBody(500))
    }
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

// 分页查询入库单和出库单
app.post('/api/product/bill/list', (req, res) => {
  billService.getBillList(req.body).then(data => {
    res.json(resBody(200, { 'records': data.rows, 'total': data.count }))
  })
    .catch(err => {
      res.json(resBody(500))
    })
})

// 近一周销量统计
app.get('/api/product/bill/salesVolumeStatistics/:type', (req, res) => {
  billService.salesVolumeStatistics(req.params.type).then(data => {
    let resData = JSON.parse(JSON.stringify(data))
    let resArr = []
    resData.forEach(item => {
      if (item.length) {
        let value = 0
        item = item.forEach(element => value += element.num)
        resArr.push(value)
      } else {
        resArr.push(0)
      }
    })
    res.json(resBody(200, resArr))
  })
    .catch(err => {
      console.log(err)
      res.json(resBody(500))
    })
})

// 导出入库单和出库单
/**
 * conf.name为表名
 * conf.cols中存放了表头的内容
 * conf.rows中存放了主体内容
 * 最后五行代码将定义的表写入response中，实现excel表的下载功能
 */
app.get('/api/product/bill/exportExcel', (req, res) => {
  let conf = {}
  conf.name = "sheet1"
  conf.cols = [
    {
      caption: '编号',
      type: 'number',
    },
    {
      caption: '商品编号',
      type: 'number',
    },
    {
      caption: '商品名',
      type: 'string',
    },
    {
      caption: '数量',
      type: 'number'
    },
    {
      caption: '单价',
      type: 'float'
    },
    {
      caption: '操作人',
      type: 'string'
    },
    {
      caption: '时间',
      type: 'string'
    },
    {
      caption: '涉及金额',
      type: 'string'
    }
  ]
  let params = {
    type: req.query.type,
    offset: req.query.offset,
    limit: req.query.limit,
    product: req.query.product,
    operator: req.query.operator,
    startTime: req.query.startTime,
    endTime: req.query.endTime
  }
  billService.getBillList(params).then(data => {
    let rows = []
    let resData = JSON.parse(JSON.stringify(data.rows))
    for (let i = 0; i < resData.length; i++) {
      let row = []
      row.push(resData[i].id)
      row.push(resData[i].product_id)
      row.push(resData[i].product_name)
      row.push(resData[i].product_num)
      row.push(resData[i].product_price)
      row.push(`${resData[i].operator_id}--${resData[i].operator_name}`)
      row.push(dateFormat(resData[i].time, 'YYYY-MM-DD hh:mm:ss'))
      row.push((resData[i].product_price * resData[i].product_num).toFixed(2))
      rows.push(row)
    }
    conf.rows = rows
    let result = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats')
    let name = req.query.type === 1 ? encodeURI('入库单') : encodeURI('出库单')
    res.setHeader("Content-Disposition", "attachment; filename=" + name + ".xlsx")
    res.end(result, 'binary')
  })
    .catch(err => {
      console.log(err)
      res.json(resBody(500))
    })
})

module.exports = app