// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainContent: [{
        imgUrl: '/images/btn_game@2x.png',
        mainIcon: '/images/icon_game@2x.png',
        mainName: '游戏对战'
      },
      {
        imgUrl: '/images/btn_sport@2x.png',
        mainIcon: '/images/icon_sport@2x.png',
        mainName: '体育约场'
      }
    ]
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
    switch (index) {
      /* 游戏对战 */
      case 0:

        break
        /* 篮球约场 */
      case 1:
        wx.navigateTo({
          url: '/pages/basketball/basketball',
        })
        break
    }
  }
})