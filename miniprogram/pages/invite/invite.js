// pages/invite/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    wx_name: '',
    wx_duiwu: '',
    orderId: 0,
    openId: '',
    formId: '',
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync("wx") != null) {
      this.setData({
        wx_name: wx.getStorageSync("wx")
      })
    }
    this.setData({
      orderId: options.orderId,
      openId: options.openId,
      formId: options.formId,
      time: options.time
    })
    console.log(this.data.openId, "----------")
  },
  /* 确认按钮 */
  sureClick(ev) {
    let that = this 
    //加载中...
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.cloud.callFunction({ //调用云函数
      name: 'inviteOrder', //云函数名为inviteOrder
      data: {
        orderId: that.data.orderId,
        wx_id: encodeURIComponent(that.data.wx_name),
        teamName: encodeURIComponent(that.data.wx_duiwu),
        state: 3,
        token: wx.getStorageSync("openId"),
        formId2: ev.detail.formId
      }
    }).then(res => { //Promise
      console.log(res.result)
      if (res.result.message == "SUCCESS") {
        wx.setStorageSync("wx", that.data.wx_name) //存储微信id
        //模板消息推送
        wx.cloud.callFunction({ //调用云函数
          name: 'send', //云函数名为send
          data: {
            openId: that.data.openId,
            orderId: that.data.orderId,
            formId: that.data.formId,
            wx_id: encodeURIComponent(that.data.wx_name),
            wx_team: encodeURIComponent(that.data.wx_duiwu),
            time: encodeURIComponent(that.data.time)

          }
        }).then(res => { //Promise
          console.log(res)


        }).catch(err => {
          console.log(err)
        })
        wx.hideLoading()
        wx.redirectTo({
          url: '/pages/invitesuccess/invitesuccess',
        })
      } else if (res.result.code == 400) {
        wx.hideLoading()
        wx.showToast({
          title: res.result.message,
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: String(err),
      })
    })
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