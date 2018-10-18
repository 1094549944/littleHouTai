
const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const database = 'mongodb://localhost/littleHouTai'

function initSchemas () {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

const connect = () => {
  //连接数据库
  mongoose.connect(database)
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    //增加数据库连接的事件监听 ,断开的时候
    mongoose.connection.on('disconnected', () => {
      //进行重连
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(database)
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请认为修理。。')
      }
    })
    //数据库出现错误
    mongoose.connection.on('error', err => {
      //进行重连
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(database)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请认为修理。。')
      }
    })
    //连接打开的时候
    mongoose.connection.on('open', () => {
      console.log('数据库连接成功')
      resolve()
    })
  })
}
module.exports = {
  connect, initSchemas
}
