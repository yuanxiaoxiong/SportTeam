// pages/addfriend/addfriend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    this_token: '',
    list: [],
    myTeamName: '',
    teamName: '',
    time: '',
    token: '',
    weiXin2Id: '',
    weiXinId: '',
    info: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    this.setData({
      this_token: wx.getStorageSync("openId"),
      myTeamName: options.myTeamName,
      teamName: options.teamName,
      time: options.time,
      token: options.token,
      weiXin2Id: options.weiXin2Id,
      weiXinId: options.weiXinId,
      info: options.info
    })

  },
  //添加好友
  addClick(ev) {
    if (this.data.this_token == this.data.token) {
      wx.setClipboardData({
        data: this.data.weiXinId,
        success: function() {
          wx.showToast({
            title: '微信号已复制，请添加对方微信进行联系',
            icon: 'none',
            duration: 3000
          })
        }
      })
    } else if (this.data.info == 1) {
      wx.setClipboardData({
        data: this.data.weiXin2Id,
        success: function() {
          wx.showToast({
            title: '微信号已复制，请添加对方微信进行联系',
            icon: 'none',
            duration: 3000
          })
        }
      })
    } else {
      wx.setClipboardData({
        data: this.data.weiXin2Id,
        success: function() {
          wx.showToast({
            title: '微信号已复制，请添加对方微信进行联系',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }

  },
  /* 在线联系 */
  onChat(ev) {
    wx.navigateTo({
      url: '/pages/chat/chat?flag=0',
    })
  },
  /* 流程须知 */
  goto_notes(ev){
    wx.navigateTo({
      url: '/pages/notes/notes',
    })
  }
})