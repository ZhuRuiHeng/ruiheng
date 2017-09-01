// pages/my/my.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: [{
          'userImg': '',
          'wx_name': ''
        }],
        list:[
           {
               pic:'https://qncdn.playonwechat.com/shangcheng/fu.png',
               title:'代付款',
               url:'../index/index',
               num:'1'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/fa.png',
               title: '代发货',
               url: '../index/index',
               num: '2'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/shou.png',
               title: '代收款',
               url: '../index/index',
               num: '13'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/finish.png',
               title: '已完成',
               url: '../index/index',
               num: '4'
           }

        ]
    },
    onLoad: function (options) {
      wx.showShareMenu({
        withShareTicket: true
      })
      var that = this;
      // 页面初始化 options为页面跳转所带来的参数
      var signData = wx.getStorageSync("loginData");
      var avatarUrl = wx.getStorageSync("avatarUrl");
      var nickName = wx.getStorageSync("nickName");
      var mobile = wx.getStorageSync("mobile");
      console.log(nickName);
      console.log(avatarUrl);
      var userInfo = {
        userImg: avatarUrl,
        nickName: nickName
      };
      that.setData({
        userInfo: userInfo
      })
    },
    onShow: function () {
      // 页面显示
      wx.getSetting({
        success(res) {
          if (!res['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success(res) {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                  console.log(res);
              },
              fail: function () {
                wx.openSetting({
                  success: (res) => {
                    console.log(res);
                    /*
                     * res.authSetting = {
                     *   "scope.userInfo": true,
                     *   "scope.userLocation": true
                     * }
                     */
                  }
                })
              }
            })
          }
        }
      })
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    //拨打电话
    makePhoneCall: function () {
        wx.makePhoneCall({
            phoneNumber: '12345678900', //此号码并非真实电话号码，仅用于测试
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    },
    //
    dingdan:function(){
        wx.navigateTo({
            url: '../dingdan/dingdan'
        })
    },
    payCar:function(){
        console.log('car');
        wx.switchTab({
            url: '../car/car'
        })
    }
})
