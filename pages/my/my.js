// pages/my/my.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: [{
          'userImg': '',
          'wx_name': ''
        }],
        showView: false,
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
      // 生命周期函数--监听页面加载  
      showView: (options.showView == "false" ? true : false)
    },
    // 分享
    fenxiang: function(){
      var that = this;
      that.setData({
        showView: (!that.data.showView)
      })  
    },
    onChangeShowState: function () {
      var that = this;
      that.setData({
        showView: (!that.data.showView)
      })
    },  
    // 优惠券
    coupon: function () {
      wx.navigateTo({
        url: '../coupon/coupon'
      })
    },
    //推荐有奖
    tuijian:function(){
      wx.navigateTo({
        url: '../tuijian/tuijian'
      })
    },
    onShow: function () {
      wx.showShareMenu({
        withShareTicket: true
      })
      var that = this;
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
