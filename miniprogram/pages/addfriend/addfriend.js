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
      this_token: wx.getStorageSync("token"),
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
        data: this.data.weiXin2Id
      })
    } else if (this.data.info == 1) {
      wx.setClipboardData({
        data: this.data.weiXin2Id
      })
    } else {
      wx.setClipboardData({
        data: this.data.weiXinId
      })
    }
  }
})