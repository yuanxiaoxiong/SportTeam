// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClick: true,
    no: '' //学号
  },
  onReady: function(options) {
    if (wx.getStorageSync("openId") != '' && wx.getStorageSync("openId") != null) {
      /* token有效性验证 */
      wx.cloud.callFunction({ //调用云函数
        name: 'token',
        data: {
          openId: wx.getStorageSync("openId")
        }
      }).then(res => {
        console.log(res.result.data, "-----")
        console.log(wx.getStorageSync("token", "-----"))
        if (res.result.data == wx.getStorageSync("token")) {
          app.globalData.tourist = 1
          wx.redirectTo({
            url: '/pages/home/home',
          })
        }
      }).catch(err => {})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /* 输入账号 */
  handleNo(ev) {
    //console.log(ev, "==============")
    if (ev.detail.value.length == 12) {
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
    console.log(ev, "==============")
    var url = ev.detail.userInfo.avatarUrl //头像
    var name = ev.detail.userInfo.nickName //微信名
    let that = this
    if (!this.data.isClick) {
      if (ev.detail.errMsg == 'getUserInfo:ok') {
        wx.showLoading({
          title: '加载中',
        })
        wx.setStorageSync("url", url)
        //微信授权
        wx.login({
          success(res) {
            //发起请求，转云函数私有网络
            console.log(res.code)
            var no = that.data.no
            wx.cloud.callFunction({ //调用云函数
              name: 'login', //云函数名为login
              data: { // 传给云函数的参数
                code: res.code,
                no: no,
                url: url,
                wxName: encodeURIComponent(name)
              }
            }).then(res => { //Promise
              console.log(res.result)
              //本地存储openid、token
              if (res.result.data != null) {
                wx.setStorageSync("openId", res.result.data.openId)
                wx.setStorageSync("token", res.result.data.token)
              }
              if (res.result.message == "SUCCESS") {
                app.globalData.tourist = 1
                wx.hideLoading()
                wx.redirectTo({
                  url: '/pages/home/home'
                })
              } else if (res.result.message == "学号不存在") {
                wx.hideLoading()
                wx.showModal({
                  title: '',
                  showCancel: false,
                  cancelColor: '#353535',
                  confirmColor: '#de213a',
                  confirmText: '确定',
                  content: '该学号不存在，请重新输入',
                  success(res) {
                    if (res.confirm) {

                    }
                  }
                })
              } else if (res.result.message == "用户已经绑定学号") {
                wx.hideLoading()
                wx.showModal({
                  title: '',
                  showCancel: false,
                  cancelColor: '#353535',
                  confirmColor: '#de213a',
                  confirmText: '确定',
                  content: '该微信号已绑定其他学号，如有疑问请联系客服',
                  success(res) {
                    if (res.confirm) {

                    }
                  }
                })
              }
            }).catch(err => {
              wx.hideLoading()
              wx.showToast({
                title: err + "",
                icon: "none"
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