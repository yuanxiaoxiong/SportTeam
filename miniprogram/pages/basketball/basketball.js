// pages/basketball/basketball.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    nullMessage: '这里空空如也~',
    list: 0,
    acceptStatus: 1,
    acceptText: '已邀请',
    indexTab: 0,
    listRecord: 0,
    recordStatus: '3',
<<<<<<< HEAD
    recordText: '待确认',
    multiArray: [['2019年','2020年','2021年','2022年','2023年','2024年','2025年'], ['1月', '2月', '3月', '4月', '5月','6月','7月','8月','9月','10月','11月','12月'], 
    ['1日', '2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日'
  ,'26日','27日','28日','29日','30日','31日'],['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'
  ,'23'],['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
  '25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50',
  '51','52','53','54','55','56','57','58','59']],
    str_start:"约场的开始时间",
    str_end:"约场的结束时间",
    str_time:"",
    str_time2:"",
    wx_name:'',
    wx_duiwu:'',
    disabled:true,
    oldColumn:0,
    multiIndex:[,,,,],
    multiIndex2:[,,,,]
=======
    recordText: '待确认'
>>>>>>> 9bb2a593a510b53e6c24aae517ba4caa49dc0880
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /* 首页 */
  shouye_click(event) {
    console.log("---", event.detail.index)
    this.setData({
      currentIndex: event.detail.index
    })
  },
  /* 约场 */
  yuechang_click(event) {
    console.log("---", event.detail.index)
    this.setData({
      currentIndex: event.detail.index
    })
  },
  /* 记录 */
  jilu_click(event) {
    console.log("---", event.detail.index)
    this.setData({
      currentIndex: event.detail.index
    })
  },
  /* 计分器 */
  jifenban_click(event) {
    console.log("---", event.detail.index)
    this.setData({
      currentIndex: event.detail.index
    })
  },
  /* 首页tab */
  onClick(event) {
    console.log("---", event.detail.index)
    switch (event.detail.index) {
      /* 对方发起 */
      case 0:
        this.setData({
          list: 10,
          acceptStatus: 0,
          acceptText: '邀请'
        })
        break
        /* 我的发起 */
      case 1:
        this.setData({
          list: 2,
          acceptStatus: 2,
          acceptText: '撤销'
          // nullMessage: '你还没发起约场呢~'
        })
        break
    }
  },
  /* 首页邀请、撤销 */
  inviteItemClick(event) {
    console.log('------', event.detail.index)
    switch (this.data.acceptStatus) {
      /* 邀请 */
      case 0:
        wx.navigateTo({
          url: '/pages/invite/invite',
        })
        break
        /* 撤销 */
      case 2:
        wx.showModal({
          title: '',
          cancelColor: '#353535',
          confirmColor: '#de213a',
          content: '是否撤销你发起的约场？',
          success(res) {
            if (res.confirm) {
              console.log('确认')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
        break
    }
  },
  /* 记录页面 */
  //待确认
  daiqueren_click(e) {
    console.log("+++", e.detail.index)
    this.setData({
      indexTab: e.detail.index,
      listRecord: 10,
      recordStatus: '3',
      recordText: '待确认'
    })
  },
  //进行中
  jinxingzhong_click(e) {
    console.log("+++", e.detail.index)
    this.setData({
      indexTab: e.detail.index,
      listRecord: 5,
      recordStatus: '4',
      recordText: '进行中'
    })
  },
  //已失效
  yishixiao_click(e) {
    console.log("+++", e.detail.index)
    this.setData({
      indexTab: e.detail.index,
      listRecord: 2,
      recordStatus: '5',
      recordText: '已失效'
    })
  },
  //点击进行中的item
<<<<<<< HEAD
 
  sureClick() {
    console.log('----点击了确认')
    wx.showToast({
      title: '发起成功',
      duration:2000,
      mask:true,
      icon:'success'
   })
  },
  /* 输入微信号 */
  wx_input(event) {
    //console.log(event)
    var name = event.detail.value
    this.setData({
      wx_name: name.replace(/\s+/g, '')
    })
    if (this.data.wx_name != '' && this.data.wx_duiwu != '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      str_start: "",
      str_time:":"
    })
  },
 
  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex2: e.detail.value,
      str_end: "",
      str_time2:":"
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:case 1:
        switch (data.multiIndex[0]) {
          case 1:case 5:
            switch (data.multiIndex[1]){
              case 0:case 2:case 4:case 6:case 7:case 9:case 11:
                  data.multiArray[2] = ['1日', '2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日'
                  ,'26日','27日','28日','29日','30日','31日'];
                  break;
              case 1:
                  data.multiArray[2] = ['1日', '2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日'
                  ,'26日','27日','28日','29日'];
                  break;
              case 3:case 5:case 8:case 10:
                  data.multiArray[2] = ['1日', '2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日'
                  ,'26日','27日','28日','29日','30日'];
                  break;
            }
            break;
          default:
              switch (data.multiIndex[1]){
                case 0:case 2:case 4:case 6:case 7:case 9:case 11:
                    data.multiArray[2] = ['1日', '2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日'
                    ,'26日','27日','28日','29日','30日','31日'];
                    break;
                case 1:
                    data.multiArray[2] = ['1日', '2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日'
                    ,'26日','27日','28日'];
                    break;
                case 3:case 5:case 8:case 10:
                    data.multiArray[2] = ['1日', '2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日'
                    ,'26日','27日','28日','29日','30日'];
                    break;
              }
              break;
        }
        data.multiIndex[2] = 0;

    }
    console.log(data.multiIndex);
    this.setData(data);
  },
  bindMultiPickerColumnChange2: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex2: this.data.multiIndex2
    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    this.oldColumn =data.multiIndex2[e.detail.column];
    switch (e.detail.column) {
      case 0:case 1:case 2:
        wx.showToast({
          title:"约场的起始时间和结束时间须在同一天内",
          mask:true,
          duration:1000,
          icon :"none"
        });
        data.multiIndex2[e.detail.column] =this.oldColumn;
        break;
      case 4:
      case 5:

    }
    console.log(data.multiIndex2);
    this.setData(data);
  },
  /* 输入班级/队伍名 */
  duiwu_input(event) {
    //console.log(event)
    var wx_duiwu = event.detail.value
    this.setData({
      wx_duiwu: wx_duiwu.replace(/\s+/g, '')
    })
    if (this.data.wx_name != '' && this.data.wx_duiwu != '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  }

=======
  onClickToRunning(e) {
    //模拟item项
    wx.showToast({
      title: '' + e.detail.index
    })
  }
>>>>>>> 9bb2a593a510b53e6c24aae517ba4caa49dc0880
})