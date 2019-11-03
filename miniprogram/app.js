//app.js
import TIM from "./modules/tim-wx-sdk/tim-wx.js";
import COS from "./modules/cos-wx-sdk-v5/demo/app.js";
let options = {
  SDKAppID: 1400279930 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示

// 注册 COS SDK 插件
tim.registerPlugin({
  'cos-wx-sdk': COS
});

App({

  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      tim: tim
    }

  }
})