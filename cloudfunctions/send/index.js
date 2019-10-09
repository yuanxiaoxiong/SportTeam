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
          value: decodeURIComponent(event.wx_id)
        },
        keyword3: {
          value: decodeURIComponent(event.wx_team)
        },
        keyword4: {
          value: decodeURIComponent(event.time)
        },
        keyword5: {
          value: '请您前往该小程序，确认此邀请信息'
        }
      },
      templateId: '8X-ybERf60b-iVuFQJVWW9PsU7zA8tB6kB11yfPXrmw', //模板id
      formId: event.formId, //要推送到的formId
      emphasisKeyword: '' //keyword3.DATA  放大效果
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}