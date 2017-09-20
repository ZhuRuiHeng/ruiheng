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
               title:'待付款',
               status: "payment",
               num:'0'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/fa.png',
               title: '待发货',
               status: "deliver",
               num: '0'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/shou.png',
               title: '待收款',
               status: "receipt",
               num: '0'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/finish.png',
               title: '已完成',
               status: "finish",
               num: '0'
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
      // wx.showShareMenu({
      //   withShareTicket: true
      // })
      wx.showToast({
        title: '加载中',
        icon: 'loading'
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
      var sign = wx.getStorageSync("sign");
      wx.request({
        url: 'https://shop.playonwechat.com/api/mine?sign=' + sign,
        success:function(res){
          console.log("mine",res);
          if(res.data.status){
            var mine = res.data.data;
            var list = that.data.list; //my各订单展示数目
            list[0].num = mine.countPayment;
            list[1].num = mine.countDeliver;
            list[2].num = mine.countReceipt;
            list[3].num = mine.countFinish;
            console.log(mine.coupon_info);
            //console.log(list);
            wx.setStorageSync("coupon_info", mine.coupon_info);
            that.setData({
              list: list,
              countCarts: mine.countCarts,
              service: mine.service,
              coupon_info: mine.coupon_info
            })
          }
          wx.hideLoading()
        }
      })
    },
    makePhone:function(e){
      var phone = e.target.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    },
    
    dingdan:function(){
        wx.navigateTo({
          url: "../dingdan/dingdan?status="
        })
    },
    shoucang:function(){
      console.log('shoucang');
        wx.switchTab({
          url: '../shoucang/shoucang'
        })
    },
    // 生成二维码
    erwei: function () {
      var sign = wx.getStorageSync("sign");
      wx.request({
        url: 'https://shop.playonwechat.com/api/create-qrcode?sign=' + sign,
        success: function (res) {
          console.log("二维码", res);
          if (res.data.status) {
            var url = res.data.url;
            wx.previewImage({
              current: url, // 当前显示图片的http链接
              urls: [url] // 需要预览的图片http链接列表
            })
          }
        }
      })
    },
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function () {
      var sharecode = wx.getStorageSync("sharecode");
      return {
        title: '邀请有奖',
        path: '/pages/tuijianShare/tuijianShare?sharecode=' + sharecode,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
    
})
