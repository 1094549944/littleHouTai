const router = require('koa-router')()
const { insertApiData } = require('../util/tool')
const mongoose = require('mongoose')
router.prefix('/classic')
//导入期刊数据
router.get('/insertAllClassicList', async (ctx) => {
  await insertApiData('../data/classic.json', 'classic', ctx)
})

//获取最新一期的数据
router.get('/latest', async (ctx) => {
  const latest = mongoose.model('classic')
  let date = new Date()
  let id = date.getMonth() + 1
  await latest.findOne({ id: id }).exec().then(async (result) => {
    ctx.body = {
      statusCode: 200,
      data: result,
      msg: '查找成功'
    }
  }).catch((error) => {
    ctx.body = {
      statusCode: 500,
      error_code: 500,
      data: error,
      msg: '查找失败'
    }
  })
})

module.exports = router