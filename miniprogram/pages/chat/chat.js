// chat.js
import Toast from "../../utils/toast";
import TIM from "../../modules/tim-wx-sdk/tim-wx.js";
import COS from "../../modules/cos-wx-sdk-v5/demo/app.js";
var app = getApp();
/**
 * 聊天输入组件展示页面
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textMessage: '',
    chatItems: [],
    extraArr: [{
      picName: 'choose_picture',
      description: '照片'
    }, {
      picName: 'take_photos',
      description: '拍摄'
    }, {
      picName: 'close_chat',
      description: '自定义功能'
    }],
    messageList: [], // 消息列表
    nextReqMessageID: '', // 用于续拉，分页续拉时需传入该字段。
    isCompleted: 0, // 表示是否已经拉完所有消息
    from_: 'user0',
    to: 'user1',
    connId: '', //会话id
    scrollTop: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    let that = this
    // 打开某个会话时，第一次拉取消息列表
    let promise = app.globalData.tim.getMessageList({
      conversationID: options.id,
      count: 20
    });
    promise.then(function(imResponse) {
      const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      console.log(messageList)
      console.log(nextReqMessageID)
      console.log(isCompleted)
      that.setData({
        connId: options.id,
        messageList: messageList,
        nextReqMessageID: nextReqMessageID,
        scrollTop: 88 * messageList.length
      })
    });
    wx.setNavigationBarTitle({
      title: '队伍名称'
    });
  },
  onReady() {
    this.chatInput = this.selectComponent('#chatInput');
  },
  /* 发送消息 */
  onSendMessageEvent(e) {
    let that = this
    let content = e.detail.value.replace(/\s+/g, '');
    console.log(content);
    if (content == '') {
      wx.showToast({
        title: '不能发送空消息',
        icon: 'none'
      })
    } else {
      // 发送文本消息，Web 端与小程序端相同
      // 1. 创建消息实例，接口返回的实例可以上屏
      let message = app.globalData.tim.createTextMessage({
        to: 'user1',
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
          text: content
        }
      });
      // 2. 发送消息
      let promise = app.globalData.tim.sendMessage(message);
      promise.then(function(imResponse) {
        // 发送成功
        console.log(imResponse);
        // 打开某个会话时，第一次拉取消息列表
        let promise = app.globalData.tim.getMessageList({
          conversationID: that.data.connId,
          count: 15
        });
        promise.then(function(imResponse) {
          const messageList = imResponse.data.messageList; // 消息列表。
          const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
          const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
          console.log(messageList)
          console.log(nextReqMessageID)
          console.log(isCompleted)
          that.setData({
            messageList: messageList,
            nextReqMessageID: nextReqMessageID,
            scrollTop: 88 * messageList.length,
            isCompleted: isCompleted
          })
        });
      }).catch(function(imError) {
        // 发送失败
        console.warn('sendMessage error:', imError);
      });
    }

  },
  /* 录音 */
  onVoiceRecordEvent(e) {
    console.log(e);

    //duration时长，单位ms
    //recordStatus 录音状态
    //fileSize 文件大小
    //tempFilePath 文件临时路径
    const {
      detail: {
        recordStatus,
        duration,
        tempFilePath,
        fileSize,
      }
    } = e;
    const status = this.chatInput.getRecordStatus();
    switch (recordStatus) {
      case status.START: //开始录音

        break;
      case status.SUCCESS: //录音成功

        break;
      case status.CANCEL: //取消录音

        break;
      case status.SHORT: //录音时长太短

        break;
      case status.UNAUTH: //未授权录音功能

        break;
      case status.FAIL: //录音失败(已经授权了)

        break;
    }
  },
  /**
   * 点击extra中的item时触发
   * @param e
   */
  onExtraItemClickEvent(e) {
    let chooseIndex = parseInt(e.detail.index);
    if (chooseIndex === 2) {
      this.myFun();
      return;
    }
    /* 照片或拍摄 */
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],
      sourceType: chooseIndex === 0 ? ['album'] : ['camera'],
      success: (res) => {
        let tempFilePath = res.tempFilePaths[0];
      }
    });
  },
  /**
   * 点击extra按钮时触发
   * @param e
   */
  onExtraClickEvent(e) {
    console.log(e);
    //isShow 是否显示extra弹窗
    const {
      detail: {
        isShow,
      }
    } = e;

  },

  myFun() {
    wx.showModal({
      title: '小贴士',
      content: '功能正在开发中...',
      confirmText: '确认',
      showCancel: true,
      success: function(res) {
        // if (res.confirm) {
        //   Toast.show('success', '自定义功能')
        // }
      }
    })
  },

  resetInputStatus() {
    //关闭extra弹窗
    this.chatInput.closeExtraView();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //监听即时消息
    let onMessageReceived = function(event) {
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TIM.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
      console.log(event, "---------------")
    };
    app.globalData.tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    let onMessageReceived = function(event) {
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TIM.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
    };
    app.globalData.tim.off(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 下拉查看更多消息
    let that = this
    let promise = app.globalData.tim.getMessageList({
      conversationID: that.data.connId,
      nextReqMessageID: that.data.nextReqMessageID,
      count: 15
    });
    promise.then(function(imResponse) {
      const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      console.log(that.data.messageList, "=======")
      console.log(messageList, "=======")
      if (that.data.isCompleted == 0) {
        var messageList_ = messageList
        messageList_ = messageList_.concat(that.data.messageList)
        console.log(messageList_, "=======")
        that.setData({
          messageList: messageList_,
          nextReqMessageID: nextReqMessageID,
          scrollTop: 0,
          isCompleted: isCompleted
        })
      }
      wx.stopPullDownRefresh()
    });
  },
  /* 滑动到距离顶部50px的操作 */
  bindscrolltoupper(ev) {
    let that = this
    if (that.data.isCompleted == 0) {
      wx.startPullDownRefresh()
    } else {
      wx.showToast({
        title: '没有更多消息了',
        icon: 'none',
        scrollTop: 0
      })
      wx.stopPullDownRefresh()
    }
  }
});