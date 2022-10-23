// 引用
const express = require('express')
const exphbs = require('express-handlebars');
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
app.use(routes)


// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})