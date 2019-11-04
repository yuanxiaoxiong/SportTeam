const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async(event, context) => {
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: event.sure_openId, //要推送到的openId
      page: 'pages/basketball/basketball',
      data: {
        keyword1: {
          value: event.orderId //订单编号
        },
        keyword2: {
          value: decodeURIComponent(event.wx_team) //班级名称
        },
        keyword3: {
          value: decodeURIComponent(event.time) //邀请时间
        },
        keyword4: {
          value: decodeURIComponent(event.result) //审核结果
        },
        keyword5: {
          value: decodeURIComponent(event.message) //请您前往该小程序页面【记录】-【进行中】-【添加好友】，
        }
      },
      templateId: 'Hw7s5JVtv5j_a_f71IA4OoVW6ZKPTFd9KBu0YViuJYM', //模板id
      formId: event.sure_formId, //要推送到的formId
      emphasisKeyword: '' //keyword3.DATA  放大效果
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}