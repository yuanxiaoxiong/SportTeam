// pages/message/message.js
import TIM from "../../modules/tim-wx-sdk/tim-wx.js";
import COS from "../../modules/cos-wx-sdk-v5/demo/app.js";
var time = require('../../utils/time.js');
var app = getApp();
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
    conversationList: [], //会话列表
    times: [],
    flag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 拉取会话列表
    let that = this
    let promise = app.globalData.tim.getConversationList();
    promise.then(function(imResponse) {
      const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
      console.log('=====', conversationList)
      var times = []
      for (var i = 0; i < conversationList.length; i++) {
        times.push({
          time: time.formatTimeTwo(conversationList[i].lastMessage.lastTime, 'h:m'),
          right: 0,
          startRight: 0
        })
      }
      console.log(times)
      that.setData({
        conversationList: conversationList,
        times: times
      })
      console.log(time.formatTimeTwo(conversationList[0].lastMessage.lastTime, 'Y-M-D h:m:s'));

    }).catch(function(imError) {
      console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
    });
  },
  /* 按下时 */
  drawStart: function(e) {
    //console.log("drawStart");
    var touch = e.touches[0];
    var startX = touch.clientX;
    var startY = touch.clientY;
    var times = this.data.times;
    for (var i in times) {
      var data = times[i];
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
    var times = this.data.times;
    for (var i in times) {
      var data = times[i];
      if (data.right <= 140 / 2) {
        data.right = 0;
      } else {
        data.right = this.data.maxRight;
      }
    }
    this.setData({
      times: times
    });
  },
  /* 滑动时 */
  drawMove: function(e) {
    //console.log("drawMove");
    var self = this;
    var dataId = e.currentTarget.id;
    var times = this.data.times;
    var item = this.data.conversationList
    if (this.data.key) {
      var touch = e.touches[0];
      var endX = touch.clientX;
      var endY = touch.clientY;
      //console.log("startX=" + this.data.startX + " endX=" + endX);
      if (endX - this.data.startX == 0)
        return;
      var res = times;
      //从右往左
      if ((endX - this.data.startX) < 0) {
        for (var k in res) {
          var data = res[k];
          if (item[k].conversationID == dataId) {
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
          if (item[k].conversationID == dataId) {
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
        times: times
      });
    }
  },
  /* 删除item */
  delItem: function(e) {
    var dataId = e.currentTarget.dataset.id;
    let that = this
    console.log("删除" + dataId);
    //删除某会话
    let promise = app.globalData.tim.deleteConversation(dataId);
    promise.then(function(imResponse) {
      // 拉取会话列表
      let promises = app.globalData.tim.getConversationList();
      promises.then(function(imResponse) {
        const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
        that.setData({
          conversationList: conversationList
        })
      }).catch(function(imError) {
        console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
      });
    }).catch(function(imError) {
      console.warn('deleteConversation error:', imError); // 删除会话失败的相关信息
    });
  },
  /* 去聊天 */
  goTochat(ev) {
    console.log(ev)
    let data = ev.currentTarget.dataset.item
    let len = data.conversationID.length
    this.setData({
      flag: 1
    })
    //console.log(data.conversationID.substring(3, len), "长度")
    wx.navigateTo({
      url: '/pages/chat/chat?flag=1&id=' + data.conversationID + '&to=' + data.conversationID.substring(3, len),
      success(res) {
        // 将某会话下所有未读消息已读上报
        app.globalData.tim.setMessageRead({
          conversationID: ev.currentTarget.id
        });
      }
    })
    //删除会话
    //let promise = app.globalData.tim.deleteConversation('C2CttMO7jSSgIdQzrDExKEhIg==');
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("message show")
    let that = this
    let onMessageReceived = function(event) {
      // event.data - 存储 Message 对象的数组 - [Message]
      console.log("message新消息", event.data)
      // 拉取会话列表
      let promise = app.globalData.tim.getConversationList();
      promise.then(function(imResponse) {
        const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
        that.setData({
          conversationList: conversationList
        })
      }).catch(function(imError) {
        console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
      });
    };
    app.globalData.tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
    if (that.data.flag == 1) {
      // 聊天界面推出再次拉取会话列表
      let promise = app.globalData.tim.getConversationList();
      promise.then(function(imResponse) {
        const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
        that.setData({
          conversationList: conversationList
        })
      }).catch(function(imError) {
        console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
      });
    }
  }
})