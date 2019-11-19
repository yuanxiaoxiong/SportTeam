// pages/home/home.js
import TIM from "../../modules/tim-wx-sdk/tim-wx.js";
import COS from "../../modules/cos-wx-sdk-v5/demo/app.js";
var userSig = require("../../utils/GenerateTestUserSig.js")
var app = getApp()
let onMessageReceived = function(event) {
  // event.data - 存储 Message 对象的数组 - [Message]

};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainContent: [{
        imgUrl: '/images/btn_game@2x.png',
        imgUrl_down: '/images/btn_game_click@2x.png',
        mainIcon: '/images/icon_game@2x.png',
        mainName: '游戏对战'
      },
      {
        imgUrl: '/images/btn_sport@2x.png',
        imgUrl_down: '/images/btn_sport_click@2x.png',
        mainIcon: '/images/icon_sport@2x.png',
        mainName: '体育约场'
      }
    ],
    isMessage: false, //是否有新消息
    isAviliable: true, //消息图标可见性
    isLogin: false, //即时IM是否登录
    unreadCount: 0, //未读消息个数
    flag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideHomeButton()//隐藏返回首页图标
    if (app.globalData.tourist != -1) {
      wx.setStorageSync('user', 1)
      var my_token = wx.getStorageSync('openId')
      //console.log(my_token, "99999999999999")
      var user = userSig.genTestUserSig(my_token)
      console.log(user, "------------")
      /* IM登录 */
      var that = this
      let promise = app.globalData.tim.login({
        userID: my_token,
        userSig: user.userSig
      });
      promise.then(function(imResponse) {
        console.log(imResponse.data); // 登录成功
        if (imResponse.data.actionStatus == 'OK') {
          that.setData({
            isLogin: true
          })
        }
      }).catch(function(imError) {
        console.warn('login error:', imError); // 登录失败的相关信息
      });
      //监听事件，如：获取会话列表
      app.globalData.tim.on(TIM.EVENT.SDK_READY, function(event) {
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        // event.name - TIM.EVENT.SDK_READY
        /* 拉取会话列表 */
        let promise2 = app.globalData.tim.getConversationList();
        promise2.then(function(imResponse) {
          const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
          console.log('------', conversationList)
          var count = 0;
          for (var i = 0; i < conversationList.length; i++) {
            count += conversationList[i].unreadCount
          }
          that.setData({
            unreadCount: count
          })
        }).catch(function(imError) {
          console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
        });
      });
    }
  },
  /**
   * 点击模块入口
   */
  onClick(event) {
    console.log('-----', event.detail.index)
    const index = event.detail.index
    //const detail = event.detail.detail
    //console.log('-----', detail.userInfo)
    switch (index) {
      /* 游戏对战 */
      case 0:
        wx.showLoading({
          title: '正在加载模块...',
          duration: 2000,
          success(res) {
            wx.navigateTo({
              url: '/pages/games/games'
            })
          }
        })

        break
        /* 体育约场 */
      case 1:
        wx.showLoading({
          title: '正在加载模块...',
          duration: 2000,
          success(res) {
            wx.navigateTo({
              url: '/pages/basketball/basketball'
            })
          }
        })

        break
    }
  },
  /* 按下时 */
  start(ev) {
    //console.log(ev)
    this.setData({
      isAviliable: false
    })
  },
  /* 松开时 */
  end(ev) {
    //console.log(ev)
    this.setData({
      isAviliable: true
    })
  },
  /* 消息通知按钮*/
  getMessage(ev) {
    console.log(ev)
    if (app.globalData.tourist != -1 && this.data.isLogin) {
      this.setData({
        flag: 1
      })
      wx.navigateTo({
        url: '/pages/message/message',
      })
    } else {
      wx.showToast({
        title: '游客暂不开放此功能，请先登录',
        icon: 'none',
        duration: 3000
      })
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    let promise = app.globalData.tim.logout();
    promise.then(function(imResponse) {
      console.log(imResponse.data, "登出成功"); // 登出成功
    }).catch(function(imError) {
      console.warn('logout error:', imError);
    });
  },
  onShow: function() {
    console.log("home show")
    // wx.hideHomeButton()//隐藏返回首页图标
    let that = this
    onMessageReceived = function(event) {
      // event.data - 存储 Message 对象的数组 - [Message]
      console.log("home新消息", event.data)
      that.setData({
        unreadCount: that.data.unreadCount + 1
      })
    };
    app.globalData.tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
    if (that.data.flag == 1) {
      /* 消息通知页面返回时再次拉取会话列表 */
      let promise2 = app.globalData.tim.getConversationList();
      promise2.then(function(imResponse) {
        const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
        console.log('------', conversationList)
        var count = 0;
        for (var i = 0; i < conversationList.length; i++) {
          count += conversationList[i].unreadCount
        }
        that.setData({
          unreadCount: count
        })
      }).catch(function(imError) {
        console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
      });
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("home hide")
    app.globalData.tim.off(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
    //wx.hideLoading()
  },
})