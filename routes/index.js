const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)
module.exports = router