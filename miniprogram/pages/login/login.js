// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClick: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /* 输入账号 */
  handleNo(ev) {
    //console.log(ev)
    if (ev.detail.value.length == 12) {
      this.setData({
        isClick: false
      })
    } else {
      this.setData({
        isClick: true
      })
    }
  },
  /* 快速登录 */
  login(ev) {
    console.log(ev.detail.errMsg)
    if (ev.detail.errMsg == 'getUserInfo:ok') {
      wx.showLoading({
        title: '加载中',
      })
      wx.redirectTo({
        url: '/pages/home/home',
        success(res) {
          wx.hideLoading()
        }
      })
    }
  },
  /* 游客访问 */
  youke(ev) {
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