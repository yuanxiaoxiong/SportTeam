// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardTeams: [{
      "id": "432474",
      "name": "android教程",
      "url": "http://www.see-source.com",
      "right": 0,
      "startRight": 0
    }, {
      "id": "443931",
      "name": "小程序教程",
      "url": "http://www.see-source.com",
      "right": 0,
      "startRight": 0
    }],
    key: false,
    startX: 0,
    maxRight: 140,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /* 按下时 */
  drawStart: function(e) {
    //console.log("drawStart");
    var touch = e.touches[0];
    var startX = touch.clientX;
    var startY = touch.clientY;
    var cardTeams = this.data.cardTeams;
    for (var i in cardTeams) {
      var data = cardTeams[i];
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
    var cardTeams = this.data.cardTeams;
    for (var i in cardTeams) {
      var data = cardTeams[i];
      if (data.right <= 140 / 2) {
        data.right = 0;
      } else {
        data.right = this.data.maxRight;
      }
    }
    this.setData({
      cardTeams: cardTeams
    });
  },
  /* 滑动时 */
  drawMove: function(e) {
    //console.log("drawMove");
    var self = this;
    var dataId = e.currentTarget.id;
    var cardTeams = this.data.cardTeams;
    if (this.data.key) {
      var touch = e.touches[0];
      var endX = touch.clientX;
      var endY = touch.clientY;
      console.log("startX=" + this.data.startX + " endX=" + endX);
      if (endX - this.data.startX == 0)
        return;
      var res = cardTeams;
      //从右往左
      if ((endX - this.data.startX) < 0) {
        for (var k in res) {
          var data = res[k];
          if (res[k].id == dataId) {
            var startRight = res[k].startRight;
            var change = this.data.startX - endX;
            startRight += change;
            if (startRight > this.data.maxRight)
              startRight = this.data.maxRight;
            res[k].right = startRight;
          }
        }
      } else { //从左往右
        for (var k in res) {
          var data = res[k];
          if (res[k].id == dataId) {
            var startRight = res[k].startRight;
            var change = endX - this.data.startX;
            startRight -= change;
            if (startRight < 0)
              startRight = 0;
            res[k].right = startRight;
          }
        }
      }
      self.setData({
        cardTeams: cardTeams
      });
    }
  },
  /* 删除item */
  delItem: function(e) {
    var dataId = e.currentTarget.dataset.id;
    console.log("删除"+dataId);
    var cardTeams = this.data.cardTeams;
    var newCardTeams = [];
    for (var i in cardTeams) {
      var item = cardTeams[i];
      if (item.id != dataId) {
        newCardTeams.push(item);
      }
    }
    this.setData({
      cardTeams: newCardTeams
    });
  },

})