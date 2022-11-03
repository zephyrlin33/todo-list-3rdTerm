const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
 isdone: {
  type: Boolean,
  default: false
  },
  userId: {  // 加入關聯設定，將todos頁面的顯示內容與user綁定，讓不是該用戶的人看不到內容
    type: Schema.Types.ObjectId,//ObjectId依照下一行的ref是與user.js中的資料id有關
    ref: 'User',
    index: true,//加快搜尋
    required: true
  }
})
module.exports = mongoose.model('Todo', todoSchema)