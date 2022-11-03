const express = require('express')
const router = express.Router()

const home = require('./modules/home')// 引入 home 模組程式碼
const todos = require('./modules/todos')// 引入 todos 模組程式碼
const users = require('./modules/users')  // add this

const { authenticator } = require('../middleware/auth')  // 掛載 middleware中的auth驗證程序

router.use('/todos', authenticator, todos) // 加入驗證程序/ 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
router.use('/users', users)  // add this
router.use('/', authenticator, home) //'/'定義寬鬆，應放在下端
// 加入驗證程序//將網址結構符合 / 字串的 request 導向 home 模組
module.exports = router

//U32
//導入middleware驗證機制(middleware/auth.js)
//修正路由(router)設定
//需要此機制的有home, todos頁面，若沒有通過認證(authenticator)則要擋下
//user頁面管理的是註冊、登入、登出，理論上無論是否在登入狀態都可以查看

//U33