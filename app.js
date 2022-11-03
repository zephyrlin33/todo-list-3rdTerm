// 引用
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')//

const usePassport = require('./config/passport')// 載入設定檔，要寫在 express-session 以後
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override') 
const routes = require('./routes')//引用路由器

require('./config/mongoose')//一併執行檔案

const app = express()
const PORT = process.env.PORT || 3000

//規定express引擎並使用hbs作為預設副檔名
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//註冊套件session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

//U33
//寫一個middleware，使每個頁面都可以使用isAuthenticated驗證機制
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
usePassport(app)//注意順序，一定要在session設定後
app.use(routes)



// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})