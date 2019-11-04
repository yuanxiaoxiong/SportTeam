// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClick: true,
    no: '' //学号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /* 输入账号 */
  handleNo(ev) {
    if (ev.detail.value.length == 3) {
      this.setData({
        isClick: false,
        no: ev.detail.value
      })
    } else {
      this.setData({
        isClick: true,
        no: ev.detail.value
      })
    }
  },
  /* 快速登录 */
  login(ev) {
    //console.log(ev.detail.errMsg)
    //console.log(this.data.isClick, "88888")
    if (!this.data.isClick) {
      if (ev.detail.errMsg == 'getUserInfo:ok') {
        wx.showLoading({
          title: '加载中',
        })
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
              //console.log(wx.getStorageSync('token'),"99999999999999")
              if (res.result.message == "SUCCESS") {
                wx.hideLoading()
                wx.redirectTo({
                  url: '/pages/home/home'
                })
              }
            }).catch(err => {
              wx.hideLoading()
              wx.showToast({
                title: err + "",
              })
            })
          }
        })
      }
    }

  },
  /* 游客访问 */
  youke(ev) {
    let that = this
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})