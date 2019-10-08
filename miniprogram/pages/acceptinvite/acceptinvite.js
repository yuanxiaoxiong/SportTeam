// pages/acceptinvite/acceptinvite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options, "------------")
    this.setData({
      orderId: options.orderId
    })
    wx.showLoading({
      title: '正在载入...',
    })
    //判断是否已确认
    wx.cloud.callFunction({ //调用云函数
      name: 'isSure', //云函数名为isSure
      data: { // 传给云函数的参数
        orderId: options.orderId
      }
    }).then(res => { //Promise
      console.log(res.result)
      if (res.result.data == 3) {
        //确认用户是否在有效期
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              //微信授权
              wx.login({
                success(res) {
                  //发起请求，转云函数私有网络
                  console.log(res.code)
                  wx.cloud.callFunction({ //调用云函数
                    name: 'login', //云函数名为login
                    data: { // 传给云函数的参数
                      code: res.code
                    }
                  }).then(res => { //Promise
                    console.log(res.result)
                    //本地存储openid、token
                    wx.setStorageSync("openId", res.result.data.openId)
                    wx.setStorageSync("token", res.result.data.token)
                    wx.hideLoading()
                  }).catch(err => {
                    wx.hideLoading()
                    wx.showToast({
                      title: err + "",
                    })
                  })
                }
              })
            } else {
              wx.showLoading({
                title: '用户授权失败，请重新授权',
              })
              wx.redirectTo({
                url: '/pages/home/home',
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '邀请已确认',
          icon: 'none',
          time: 2000
        })
        wx.redirectTo({
          url: '/pages/basketball/basketball',
        })
        wx.hideLoading()
      }
    }).catch(err => {

    })
  },

  /* 同意 */
  acceptClick() {
    wx.showLoading({
      title: '正在载入...',
    })
    wx.cloud.callFunction({ //调用云函数
      name: 'acceptOrder', //云函数名为acceptOrder
      data: { // 传给云函数的参数
        orderId: this.data.orderId,
        state: 4,
        formId: 'null'
      }
    }).then(res => { //Promise
      console.log(res.result)
      if (res.result.message == "SUCCESS") {
        wx.hideLoading()
        wx.showToast({
          title: '已同意',
          icon: 'none'
        })
        wx.redirectTo({
          url: '/pages/basketball/basketball',
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: String(err),
        icon: 'none'
      })
    })
  },
  /* 拒绝 */
  refuseClick(ev) {
    wx.showLoading({
      title: '正在加载...',
    })
    wx.cloud.callFunction({ //调用云函数
      name: 'acceptOrder', //云函数名为acceptOrder
      data: { // 传给云函数的参数
        orderId: this.data.orderId,
        state: 0,
        formId: ev.detail.formId
      }
    }).then(res => { //Promise
      console.log(res.result)
      if (res.result.message == "SUCCESS") {
        wx.hideLoading()
        wx.showToast({
          title: '已拒绝',
          icon: 'none'
        })
        wx.redirectTo({
          url: '/pages/basketball/basketball',
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: String(err),
        icon: 'none'
      })
    })
  }
})