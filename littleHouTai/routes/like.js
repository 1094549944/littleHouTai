const router = require('koa-router')()
const { insertApiData } = require('../util/tool')
const mongoose = require('mongoose')
router.prefix('/like')


//点赞
router.post('/', async (ctx) => {
  const list = mongoose.model('classic')
  let params = {
    _id: ctx.request.body._id,
    type: ctx.request.body.type
  }
  let updateParams = {
    "$set": {
      'like_status': 1,

    },
    "$inc": {
      'fav_nums': +1
    }
  }
  await list.update(params, updateParams).exec().then(async (result) => {

    ctx.body = {
      statusCode: 200,
      data: result,
      msg: '修改成功，您已经添加了点赞'
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
    _id: ctx.request.body._id,
    type: ctx.request.body.type
  }
  let updateParams = {
    "$set": {
      'like_status': 0,

    },
    "$inc": {
      'fav_nums': -1
    }
  }
  await list.update(params, updateParams).exec().then(async (result) => {

    ctx.body = {
      statusCode: 200,
      data: result,
      msg: '修改成功,已经取消了点赞'
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