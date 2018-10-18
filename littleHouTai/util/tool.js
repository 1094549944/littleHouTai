const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

//导入数据
async function insertApiData (file, mongoName, ctx) {
  let dataGet = {}
  await new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, file), 'utf-8', function (error, data) {
      data = JSON.parse(data)
      dataGet = data
      let saveCount = 0
      const mongoNameGet = mongoose.model(mongoName)
      data.map((value, index) => {

        let result = new mongoNameGet(value)

        result.save().then(() => {
          saveCount++
          console.log('插入成功:' + saveCount)
        }).catch(error => {
          console.log('插入失败:' + error)
        })
      })
      resolve()
    })

  })
  ctx.body = dataGet
}



module.exports = {
  insertApiData
}