const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async(event, context) => {
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: 'o7geA4jzuPiEWlj2DGOMpXjaH8V8', //要推送到的openId
      page: 'pages/acceptinvite/acceptinvite',
      data: {
        keyword1: {
          value: '2019100800023123'
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
      templateId: 'cUC0JflqzrR70sUkYEQjn1DgA7qcYxFlJhkMYcLo5C8', //模板id
      formId: event.formId,
      emphasisKeyword: 'keyword4.DATA' //keyword1.DATA  放大效果
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}