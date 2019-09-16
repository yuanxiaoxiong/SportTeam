// components/record-tab/record-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    daiqueren_click(e) {
      // console.log(e)
      this.triggerEvent('daiqueren_click', {
        index: 0
      }, {})
    },
    jinxingzhong_click(e) {
      // console.log(e)
      this.triggerEvent('jinxingzhong_click', {
        index: 1
      }, {})
    },
    yishixiao_click(e) {
      // console.log(e)
      this.triggerEvent('yishixiao_click', {
        index: 2
      }, {})
    }
  }
})