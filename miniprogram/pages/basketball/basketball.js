// pages/basketball/basketball.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /* 首页 */
  shouye_click(event){
    console.log("---",event.detail.index)
  },
  /* 约场 */
  yuechang_click(event){
    console.log("---", event.detail.index)
  },
  /* 记录 */
  jilu_click(event) {
    console.log("---", event.detail.index)
  },
  /* 计分器 */
  jifenban_click(event) {
    console.log("---", event.detail.index)
  }
})