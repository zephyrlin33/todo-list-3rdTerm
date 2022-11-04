

//本地驗證
module.exports = {
  //建立middleware
    authenticator: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      }
      req.flash('warning_msg', '請先登入才能使用！')  // 
      
      res.redirect('/users/login')
    }

    

  }



//U32
//middleware的特性，收到next()才會進入下一步
//isAuthenticated()是passport提供的認證機制
//整段的意思是若認證成功，執行next()，若不成功則重新導向回login頁面

//U35
//登入不成功先顯示flash message，'warning_msg'