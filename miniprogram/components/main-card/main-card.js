// components/main_card/main_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //传递进来的数据
    mainContent: {
      type: Array,
      value: []
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
    click(event) {
      const index = event.currentTarget.dataset.index
      // console.log("----", index)
      //通知页面内部的点击事件
      this.triggerEvent('itemClick', {
        index
      }, {})
    }
  }
})