// pages/basketball/basketball.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    nullMessage: '空空如也~',
    list: 0,
    acceptStatus: 1,
    acceptText: '已邀请'
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
          list: 10,
          acceptStatus: 0,
          acceptText: '邀请'
        })
        break
        /* 我的发起 */
      case 1:
        this.setData({
          list: 2,
          acceptStatus: 2,
          acceptText: '撤销'
          // nullMessage: '你还没发起约场呢~'
        })
        break
    }
  },
  /* 首页邀请、撤销 */
  inviteItemClick(event) {
    console.log('------', event.detail.index)
    switch (this.data.acceptStatus) {
      /* 邀请 */
      case 0:
        wx.navigateTo({
          url: '/pages/invite/invite',
        })
        break
        /* 撤销 */
      case 2:
        wx.showModal({
          title: '',
          cancelColor:'#353535',
          confirmColor:'#de213a',
          content: '是否撤销你发起的约场？',
          success(res){
            if(res.confirm){
              console.log('确认')
            }else if(res.cancel){
              console.log('取消')
            }
          }
        })
        break
    }
  }
})