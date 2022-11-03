const express = require('express')
const bcrypt = require('bcryptjs')  // 載入套件
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')// 引用 passport

//login
router.get('/login', (req, res) => {
  res.render('login')
})

// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})


//register
router.get('/register', (req, res) => {
  res.render('register')
})

//regist function
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body

  //U35錯誤發生的flash message
  const errors = [] //存放error
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
    return bcrypt
    .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
    .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
    .then(hash => User.create({
      name,
      email,
      password: hash // 用雜湊值取代原本的使用者密碼
    }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})


module.exports = router
