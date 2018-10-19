const router = require('koa-router')()
const { insertApiData } = require('../util/tool')
const mongoose = require('mongoose')
router.prefix('/like')


//点赞
router.post('/', async (ctx) => {
  const list = mongoose.model('classic')
  let params = {
    id: ctx.request.body.id,
    type: ctx.request.body.type
  }
  await list.update(params, { $set: { 'like_status': '1' } }).exec().then(async (result) => {

    ctx.body = {
      statusCode: 200,
      data: result,
      msg: '修改成功'
    }
  }).catch((error) => {
    ctx.body = {
      statusCode: 500,
      error_code: 500,
      data: error,
      msg: '修改失败'
    }
  })
})

//取消点赞
router.post('/cancel', async (ctx) => {
  const list = mongoose.model('classic')
  let params = {
    id: ctx.request.body.id,
    type: ctx.request.body.type
  }
  await list.update(params, { $set: { 'like_status': '0' } }).exec().then(async (result) => {

    ctx.body = {
      statusCode: 200,
      data: result,
      msg: '修改成功'
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