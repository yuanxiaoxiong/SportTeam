// pages/addfriend/addfriend.js
import TIM from "../../modules/tim-wx-sdk/tim-wx.js";
import COS from "../../modules/cos-wx-sdk-v5/demo/app.js";
var userSig = require("../../utils/GenerateTestUserSig.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    this_token: '',
    list: [],
    myTeamName: '',
    teamName: '',
    time: '',
    token: '',
    weiXin2Id: '',
    weiXinId: '',
    info: 0,
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    let that = this
    if (options.info != 2) {
      that.setData({
        this_token: wx.getStorageSync("openId"),
        myTeamName: options.myTeamName,
        teamName: options.teamName,
        time: options.time,
        token: options.token,
        weiXin2Id: options.weiXin2Id,
        weiXinId: options.weiXinId,
        info: options.info,
        type: options.type
      })
    } else if (options.info == 2 && options.type == 'game') {
      var my_token = wx.getStorageSync('openId')
      var user = userSig.genTestUserSig(my_token)
      //console.log(user, "------------")
      /* IM登录 */
      let promise = app.globalData.tim.login({
        userID: my_token,
        userSig: user.userSig
      });
      promise.then(function(imResponse) {
        console.log(imResponse.data); // 登录成功
      }).catch(function(imError) {
        console.warn('login error:', imError); // 登录失败的相关信息
      });
      wx.cloud.callFunction({ //调用云函数
        name: 'get_orderbyid', //云函数名为isSure
        data: { // 传给云函数的参数
          orderId: options.orderId,
          type: 'game'
        }
      }).then(res => { //Promise
        console.log(res.result, "=========")
        var data = res.result.data
        that.setData({
          this_token: wx.getStorageSync("openId"),
          myTeamName: data.myTeamName,
          teamName: data.teamName,
          time: data.time,
          token: data.token,
          weiXin2Id: data.weiXin2Id,
          weiXinId: data.weiXinId,
          info: options.info,
          type: options.type
        })
      }).catch(err => {

      })
    } else if (options.info == 2 && options.type == 'ball') {
      var my_token = wx.getStorageSync('openId')
      var user = userSig.genTestUserSig(my_token)
      console.log(options.orderId, "------------")
      /* IM登录 */
      let promise = app.globalData.tim.login({
        userID: my_token,
        userSig: user.userSig
      });
      promise.then(function(imResponse) {
        console.log(imResponse.data); // 登录成功
      }).catch(function(imError) {
        console.warn('login error:', imError); // 登录失败的相关信息
      });
      wx.cloud.callFunction({ //调用云函数
        name: 'get_orderbyid', //云函数名为isSure
        data: { // 传给云函数的参数
          orderId: options.orderId,
          type: 'order'
        }
      }).then(res => { //Promise
        console.log(res.result, "=========")
        var data = res.result.data
        that.setData({
          this_token: wx.getStorageSync("openId"),
          myTeamName: data.myTeamName,
          teamName: data.teamName,
          time: data.time,
          token: data.token,
          weiXin2Id: data.weiXin2Id,
          weiXinId: data.weiXinId,
          info: options.info,
          type: options.type
        })
      }).catch(err => {

      })
    }

  },
  //添加好友
  addClick(ev) {
    var messages = ''
    if (this.data.type == 'game') {
      messages = '游戏昵称已复制，请添加对方进行对战'
    } else {
      messages = '微信号已复制，请添加对方微信进行联系'
    }
    if (this.data.this_token == this.data.token) {
      wx.setClipboardData({
        data: this.data.weiXinId,
        success: function() {
          wx.showToast({
            title: messages,
            icon: 'none',
            duration: 3000
          })
        }
      })
    } else if (this.data.info == 1) {
      wx.setClipboardData({
        data: this.data.weiXin2Id,
        success: function() {
          wx.showToast({
            title: messages,
            icon: 'none',
            duration: 3000
          })
        }
      })
    } else {
      wx.setClipboardData({
        data: this.data.weiXin2Id,
        success: function() {
          wx.showToast({
            title: messages,
            icon: 'none',
            duration: 3000
          })
        }
      })
    }

  },
  /* 在线联系 */
  onChat(ev) {
    wx.navigateTo({
      url: '/pages/chat/chat?flag=0',
    })
  },
  /* 流程须知 */
  goto_notes(ev) {
    wx.navigateTo({
      url: '/pages/notes/notes',
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.info == 2) {
      let promise = app.globalData.tim.logout();
      promise.then(function(imResponse) {
        console.log(imResponse.data, "登出成功"); // 登出成功
      }).catch(function(imError) {
        console.warn('logout error:', imError);
      });
    }
  },
})