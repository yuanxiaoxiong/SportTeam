// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入request-promise用于做网络请求
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  let url = 'https://www.huaguangstore.com.cn/order/invite?id=' + event.orderId + '&weixin2Id=' + event.wx_id + '&teamName=' + event.teamName + '&orderState=' + event.state + '&token=' + event.token;
  var options = {
    method: 'POST',
    uri: url,
    // body: {
    //   code: event.code
    // },
    json: true // Automatically stringifies the body to JSON
  };

  return await rp(options)
    .then(function(res) {
      return res
    })
    .catch(function(err) {
      return err
    });
}