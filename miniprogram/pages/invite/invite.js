// pages/invite/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    wx_name: '',
    wx_duiwu: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onHide(e) {
    console.log('隐藏了')
  },
  /* 确认按钮 */
  sureClick() {
    console.log('----点击了确认')
    //加载中...
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    //模拟网络延迟
    setTimeout(function() {
      wx.hideLoading()
      wx.redirectTo({
        url: '/pages/invitesuccess/invitesuccess',
      })
    }, 2000)

  },
  /* 输入微信号 */
  wx_input(event) {
    //console.log(event)
    var name = event.detail.value
    this.setData({
      wx_name: name.replace(/\s+/g, '')
    })
    if (this.data.wx_name != '' && this.data.wx_duiwu != '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  /* 输入班级/队伍名 */
  duiwu_input(event) {
    //console.log(event)
    var wx_duiwu = event.detail.value
    this.setData({
      wx_duiwu: wx_duiwu.replace(/\s+/g, '')
    })
    if (this.data.wx_name != '' && this.data.wx_duiwu != '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  }
})