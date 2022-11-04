// config/passport.js
 
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy//本地登入策略
const FacebookStrategy = require('passport-facebook').Strategy//Facebook登入策略
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  })) 


  //新增facebook登入

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    //console.log(profile)//可在terminal上看到資訊
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        //若現存資料庫有符合該email的帳號，直接回傳該user的資料
        if (user) return done(null, user)
        //現存資料庫沒有使用這筆email的帳號，新增帳號
            //幫助以第三方登入的使用者，創建一組亂數密碼。英文(26)+數字(10)，取後八位
        const randomPassword = Math.random().toString(36).slice(-8)
        
        //運用bcrypt加密
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
    }
  ))


   // 設定序列化與反序列化

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
