// components/item-data-games/item-data-games.js
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
    },
    open: {
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
    onClick(event) {
      //console.log(event.currentTarget.dataset)
      const index = event.currentTarget.dataset.index
      const orderId = event.currentTarget.dataset.orderid
      const openId = event.currentTarget.dataset.openid
      const formId = event.currentTarget.dataset.formid
      const time = event.currentTarget.dataset.time
      //通知页面内部的点击事件
      this.triggerEvent('inviteItemClick', {
        index,
        orderId,
        openId,
        formId,
        time
      }, {})
    },
    openClick(ev) {
      const index = ev.currentTarget.dataset.index
      //console.log(index)
      //通知页面内部的点击事件
      this.triggerEvent('openItemClick', {
        index
      }, {})
    }
  }
})