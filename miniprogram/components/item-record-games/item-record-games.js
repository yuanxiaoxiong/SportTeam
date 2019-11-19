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
    },
    space: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    key: false,
    startX: 0,
    maxRight: 160
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
    },
    /* 按下时 */
    drawStart: function(e) {
      //console.log("drawStart");
      var touch = e.touches[0];
      var startX = touch.clientX;
      var startY = touch.clientY;
      var space = this.properties.space
      //console.log(space, "--------")
      for (var i in space) {
        var data = space[i];
        data.startRight = data.right;
      }
      //var key = true;
      this.setData({
        key: true,
        startX: startX
      })
    },
    /* 松开时 */
    drawEnd: function(e) {
      //console.log("drawEnd");
      var space = this.properties.space
      for (var i in space) {
        var data = space[i];
        if (data.right <= 160 / 2) {
          data.right = 0;
        } else {
          data.right = this.data.maxRight;
        }
      }
      this.setData({
        space: space
      });
    },
    /* 滑动时 */
    drawMove: function(e) {
      //console.log("drawMove",e.currentTarget.dataset.id);
      var self = this;
      var dataId = e.currentTarget.dataset.id;
      var space = this.properties.space;
      var item = this.properties.list
      if (this.data.key) {
        var touch = e.touches[0];
        var endX = touch.clientX;
        var endY = touch.clientY;
        //console.log("startX=" + this.data.startX + " endX=" + endX);
        if (endX - this.data.startX == 0)
          return;
        //从右往左
        if ((endX - this.data.startX) < 0) {
          for (var k in space) {
            if (item[k].orderId == dataId) {
              var startRight = space[k].startRight;
              var change = this.data.startX - endX;
              startRight += change;
              if (startRight > this.data.maxRight)
                startRight = this.data.maxRight;
              space[k].right = startRight;
            }
          }
        } else { //从左往右
          for (var k in space) {
            if (item[k].orderId == dataId) {
              var startRight = space[k].startRight;
              var change = endX - this.data.startX;
              startRight -= change;
              if (startRight < 0)
                startRight = 0;
              space[k].right = startRight;
            }
          }
        }
        self.setData({
          space: space
        });
      }
    },
    /* 删除item */
    delItem(ev) {
      //console.log("删除", ev.currentTarget.dataset.id)
      var id = ev.currentTarget.dataset.id
      var index = ev.currentTarget.dataset.index
      //通知页面内部的点击事件
      this.triggerEvent('delItem', {
        id,
        index
      }, {})
    }
  }
})