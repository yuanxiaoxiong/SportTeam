// components/item-data/item-data.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    index_tab: {
      type: Number,
      value: 0
    },
    /* 需要整理成list列表 */
    acceptText: {
      type: String,
      value: '邀请'
    },
    /* 0邀请 1已邀请 2撤销 */
    acceptStatus: {
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
    onClick(event) {
      //console.log(event.currentTarget.dataset.index)
      const index = event.currentTarget.dataset.index
      //通知页面内部的点击事件
      this.triggerEvent('inviteItemClick', {
        index
      }, {})
    }
  }
})