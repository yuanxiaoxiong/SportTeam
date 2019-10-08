const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async(event, context) => {
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: event.openId, //要推送到的openId
      page: 'pages/acceptinvite/acceptinvite?orderId=' + event.orderId,
      data: {
        keyword1: {
          value: event.orderId
        },
        keyword2: {
          value: '66.66元'
        },
        keyword3: {
          value: '2019-10-08 02:28'
        },
        keyword4: {
          value: '战神之斧'
        },
        keyword5: {
          value: '66.66元'
        },
        keyword6: {
          value: '快点啦'
        },
        keyword7: {
          value: '待支付'
        }
      },
      templateId: 'cUC0JflqzrR70sUkYEQjn-kF8oZjlT6TN1zkpAo8mqI', //模板id
      formId: event.formId, //要推送到的formId
      emphasisKeyword: 'keyword4.DATA' //keyword1.DATA  放大效果
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}