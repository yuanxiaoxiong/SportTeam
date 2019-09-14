// pages/basketball/basketball.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    nullMessage: '空空如也~',
    list: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /* 首页 */
  shouye_click(event) {
    console.log("---", event.detail.index)
    this.setData({
      currentIndex: event.detail.index
    })
  },
  /* 约场 */
  yuechang_click(event) {
    console.log("---", event.detail.index)
    this.setData({
      currentIndex: event.detail.index
    })
  },
  /* 记录 */
  jilu_click(event) {
    console.log("---", event.detail.index)
    this.setData({
      currentIndex: event.detail.index
    })
  },
  /* 计分器 */
  jifenban_click(event) {
    console.log("---", event.detail.index)
    this.setData({
      currentIndex: event.detail.index
    })
  },
  /* 首页tab */
  onClick(event) {
    console.log("---", event.detail.index)
    switch (event.detail.index) {
      /* 对方发起 */
      case 0:
        this.setData({
          list: 10
        })
        break
        /* 我的发起 */
      case 1:
        this.setData({
          list: 0,
          nullMessage: '你还没发起约场呢~'
        })
        break
    }
  }
})