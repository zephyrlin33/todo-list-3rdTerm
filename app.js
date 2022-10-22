// 引用
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override') 

const Todo = require('./models/todo') // 載入 Todo model

//const router = express.Router()
const routes = require('./routes')
const app = express()

//資料庫連線設定
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})



//規定express引擎並使用hbs作為預設副檔名
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


// 設定首頁路由


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})