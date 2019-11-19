// pages/acceptinvite_game/acceptinvite_game.js
import TIM from "../../modules/tim-wx-sdk/tim-wx.js";
import COS from "../../modules/cos-wx-sdk-v5/demo/app.js";
var userSig = require("../../utils/GenerateTestUserSig.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // if (options.flag == 0) {
    //   /* IM登录 */
    //   var my_token = wx.getStorageSync('openId')
    //   var user = userSig.genTestUserSig(my_token)
    //   let promise = app.globalData.tim.login({
    //     userID: my_token,
    //     userSig: user.userSig
    //   });
    //   promise.then(function(imResponse) {
    //     console.log(imResponse.data); // 登录成功
    //     if (imResponse.data.actionStatus == 'OK') {
    //       that.setData({
    //         isLogin: true
    //       })
    //     }
    //   }).catch(function(imError) {
    //     console.warn('login error:', imError); // 登录失败的相关信息
    //   });
    // }
    console.log(options.orderId, "------------")
    that.setData({
      orderId: options.orderId
    })
    wx.showLoading({
      title: '正在载入...',
    })
    //判断是否已确认
    wx.cloud.callFunction({ //调用云函数
      name: 'isSure_game', //云函数名为isSure
      data: { // 传给云函数的参数
        orderId: options.orderId
      }
    }).then(res => { //Promise
      console.log(res.result, "=========")
      that.setData({
        list: res.result.data
      })
      //确认用户是否在有效期
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.hideLoading()
            wx.showModal({
              title: '',
              cancelColor: '#353535',
              confirmColor: '#de213a',
              confirmText: '好的',
              showCancel: false,
              content: '用户已失效，请重新登录',
              success(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                }
              }
            })
          }
          if (that.data.list.orderState == 3) {
            wx.hideLoading()
            var list = that.data.list
            console.log(list)
            var info = 0
            if (list.openId == wx.getStorageSync("openId")) {
              info = 1
              wx.setStorageSync('token_other', list.token)
            } else {
              wx.setStorageSync('token_other', list.openId)
            }
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '邀请已确认',
              icon: 'none',
              duration: 3000,
              success: function() {
                var list = that.data.list
                console.log(list)
                var info = 0
                if (list.openId == wx.getStorageSync("openId")) {
                  info = 1
                  wx.setStorageSync('token_other', list.token)
                } else {
                  wx.setStorageSync('token_other', list.openId)
                }
                wx.navigateTo({
                  url: '/pages/addfriend/addfriend?myTeamName=' + list.myTeamName + '&teamName=' + list.teamName +
                    '&time=' + list.time + '&weiXin2Id=' + list.weiXin2Id + '&token=' + list.token + '&weiXinId=' + list.weiXinId + '&info=2' + '&type=game' + '&orderId=' + list.orderId,
                })
              }
            })
          }
        }
      })
    }).catch(err => {

    })
  },

  /* 同意 */
  acceptClick(ev) {
    console.log(ev.detail.formId)
    let that = this
    wx.showLoading({
      title: '正在载入...',
    })
    wx.cloud.callFunction({ //调用云函数
      name: 'acceptGame', //云函数名为acceptOrder
      data: { // 传给云函数的参数
        orderId: that.data.orderId,
        state: 4,
        formId: 'running'
      }
    }).then(res => { //Promise
      console.log(res.result)
      if (res.result.message == "SUCCESS") {
        //同意邀请
        console.log(wx.getStorageSync('token_other'), "==========")
        wx.cloud.callFunction({ //调用云函数,推送已确认邀请的消息
          name: 'send_result', //云函数名为send_result
          data: { // 传给云函数的参数
            sure_openId: wx.getStorageSync('token_other'),
            orderId: that.data.orderId,
            wx_team: encodeURIComponent(that.data.list.myTeamName),
            time: encodeURIComponent(that.data.list.time),
            result: encodeURIComponent('已同意'),
            message: encodeURIComponent('请您前往该小程序【添加好友】或【在线联系】'),
            sure_formId: that.data.list.remarks_other,
            type: 'game'
          }
        }).then(res => { //Promise
          console.log(res, "------------")
          wx.hideLoading()
          wx.showToast({
            title: '已同意',
            icon: 'none'
          })
          var list = that.data.list
          //console.log(list)
          var info = 0
          if (list.openId == wx.getStorageSync("openId")) {
            info = 1
            wx.setStorageSync('token_other', list.token)
          } else {
            wx.setStorageSync('token_other', list.openId)
          }
          wx.redirectTo({
            url: '/pages/addfriend/addfriend?myTeamName=' + list.myTeamName + '&teamName=' + list.teamName +
              '&time=' + list.time + '&weiXin2Id=' + list.weiXin2Id + '&token=' + list.token + '&weiXinId=' + list.weiXinId + '&info=2' + '&type=game' + '&orderId=' + list.orderId,
          })
        })
      } else {
        wx.showToast({
          title: '系统出了点小差，请重试~',
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: String(err),
        icon: 'none'
      })
    })
  },
  /* 拒绝 */
  refuseClick(ev) {
    let that = this
    wx.showLoading({
      title: '正在加载...',
    })
    wx.cloud.callFunction({ //调用云函数
      name: 'acceptGame', //云函数名为acceptOrder
      data: { // 传给云函数的参数
        orderId: that.data.orderId,
        state: 0,
        formId: ev.detail.formId
      }
    }).then(res => { //Promise
      console.log(res.result)
      if (res.result.message == "SUCCESS") {
        //拒绝邀请
        wx.cloud.callFunction({ //调用云函数，推送已确认邀请的消息
          name: 'send_result', //云函数名为send_result
          data: { // 传给云函数的参数
            sure_openId: wx.getStorageSync('token_other'),
            orderId: that.data.orderId,
            wx_team: encodeURIComponent('班级名称'),
            time: encodeURIComponent('邀请时间'),
            result: encodeURIComponent('已拒绝'),
            message: encodeURIComponent('下次有缘再相约'),
            sure_formId: that.data.remarks_other
          }
        }).then(res => { //Promise
          console.log(res, "result------------")
          wx.hideLoading()
          wx.showToast({
            title: '已拒绝',
            icon: 'none',
            duration: 2000,
            success: function() {
              wx.reLaunch({
                url: '/pages/home/home',
              })
            }
          })
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: String(err),
        icon: 'none'
      })
    })
  }
})