// components/item-record-games/item-record-games.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
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
    },
    token: {
      type: String,
      value: ''
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
      //console.log('----',e)
      const item = e.currentTarget.dataset.item
      //通知页面内部的点击事件
      this.triggerEvent('onClickToRunning', {
        item
      }, {})
    },
    onClickTosure(e) {
      //console.log('----',e)
      const item = e.currentTarget.dataset.item
      //通知页面内部的点击事件
      this.triggerEvent('onClickTosure', {
        item
      }, {})
    }
  }
})