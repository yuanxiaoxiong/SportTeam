// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainContent: [{
        imgUrl: '/images/btn_game@2x.png',
        imgUrl_down: '/images/btn_game_click@2x.png',
        mainIcon: '/images/icon_game@2x.png',
        mainName: '游戏对战'
      },
      {
        imgUrl: '/images/btn_sport@2x.png',
        imgUrl_down: '/images/btn_sport_click@2x.png',
        mainIcon: '/images/icon_sport@2x.png',
        mainName: '体育约场'
      }
    ],
    isMessage: false, //是否有新消息
    isAviliable: true, //消息图标可见性
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 点击模块入口
   */
  onClick(event) {
    console.log('-----', event.detail.index)
    const index = event.detail.index
    const detail = event.detail.detail
    //console.log('-----', detail.userInfo)
    switch (index) {
      /* 游戏对战 */
      case 0:

        break
        /* 体育约场 */
      case 1:
        if (detail.errMsg == "getUserInfo:ok") {
          wx.showLoading({
            title: '正在加载模块...',
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
                if (res.result.message == "SUCCESS") {
                  wx.hideLoading()
                  wx.navigateTo({
                    url: '/pages/basketball/basketball'
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
        break
    }
  },
  /* 按下时 */
  start(ev) {
    //console.log(ev)
    this.setData({
      isAviliable: false
    })
  },
  /* 松开时 */
  end(ev) {
    //console.log(ev)
    this.setData({
      isAviliable: true
    })
  },
  /* 获取新消息 */
  getMessage(ev) {
    //console.log(ev)
    wx.navigateTo({
      url: '/pages/message/message',
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