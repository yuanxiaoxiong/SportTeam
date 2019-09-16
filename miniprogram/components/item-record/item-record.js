// components/item-record/item-record.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Number,
      value: 0
    },
    /* 需要整理成list列表 */
    recordText: {
      type: String,
      value: '待确认'
    },
    /* 3待确认 4进行中 5已失效 */
    recordStatus: {
      type: Number,
      value: 3
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
    onClickToRunning(e) {
      console.log('----',e.currentTarget.dataset.index)
      const index = e.currentTarget.dataset.index
      //通知页面内部的点击事件
      this.triggerEvent('onClickToRunning', {
        index
      }, {})
    }
  }
})