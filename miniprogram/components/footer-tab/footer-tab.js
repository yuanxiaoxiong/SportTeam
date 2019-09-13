// components/footer-tab/footer-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    shouye_click() {
      //修改currentIndex
      this.setData({
        currentIndex: 0
      })
      //通知页面内部的点击事件
      this.triggerEvent('shouye_click', {
        index: this.data.currentIndex
      }, {})
    },
    yuechang_click() {
      //修改currentIndex
      this.setData({
        currentIndex: 1
      })
      //通知页面内部的点击事件
      this.triggerEvent('yuechang_click', {
        index: this.data.currentIndex
      }, {})
    },
    jilu_click() {
      //修改currentIndex
      this.setData({
        currentIndex: 2
      })
      //通知页面内部的点击事件
      this.triggerEvent('jilu_click', {
        index: this.data.currentIndex
      }, {})
    },
    jifenban_click() {
      //修改currentIndex
      this.setData({
        currentIndex: 3
      })
      //通知页面内部的点击事件
      this.triggerEvent('jifenban_click', {
        index: this.data.currentIndex
      }, {})
    }
  }
})