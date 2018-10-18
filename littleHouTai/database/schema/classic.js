const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** 
 * 
 * content：期刊内容
  fav_nums: 点赞次数
  image: 图片
  index: 期号
  like_status: 是否点赞
  pubdate: 发布日期
  title: 期刊题目
  type: 期刊类型,这里的类型分为:100 电影 200 音乐 300 句子
  id: 期刊在数据中序号，供点赞使用
 * 
 * 
*/

const classicList = new Schema({
  id: { unique: true, type: String },
  content: { type: String },
  fav_nums: { type: Number },
  index: { type: Number },
  like_status: { type: Number },
  pubdate: { type: String },
  title: { type: String },
  type: { type: Number },
  image:{type:String}
})

mongoose.model('classic', classicList)