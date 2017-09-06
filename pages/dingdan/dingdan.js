// pages/dingdan/dingdan.js
//支付
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      status: "",
      navList:[
        {
          word: "全部",
          status:""
        },
        {
          word: " 待付款",
          status: "payment"
        },
        {
          word: " 待发货",
          status: "deliver"
        },
        {
          word: "待收货",
          status: "receipt"
        },
        {
          word: "已完成",
          status: "finish"
        }
      ],
      page: 0,  //分页
      // newlists: [{
      //   imgurl: '../images/5.jpg',
      //   name: "榴莲香雪蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'

      // }, {
      //   imgurl: '../images/6.jpg',
      //   name: "芒果雪沙蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }, {
      //   imgurl: '../images/7.jpg',
      //   name: "四重奏蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }
      //   , {
      //   imgurl: '../images/8.jpg',
      //   name: "芒果沙滩蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }
      //   , {
      //   imgurl: '../images/9.jpg',
      //   name: "提拉米苏蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }
      //   , {
      //   imgurl: '../images/5.jpg',
      //   name: "步步高升蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }],
      // newlistsa: [{
      //   imgurl: '../images/5.jpg',
      //   name: "草莓白天使蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'

      // }, {
      //   imgurl: '../images/9.jpg',
      //   name: "榴莲香雪蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }, {
      //   imgurl: '../images/8.jpg',
      //   name: "盛夏爱琴海蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }
      //   , {
      //   imgurl: '../images/7.jpg',
      //   name: "加州阳光蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }
      //   , {
      //   imgurl: '../images/6.jpg',
      //   name: "步步高升蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }
      //   , {
      //   imgurl: '../images/5.jpg',
      //   name: "芒果茫茫蛋糕",
      //   price: '126',
      //   img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      // }],
  },
  
onLoad: function () { //加载数据渲染页面
    //this.fetchHotData(); //最热
},
  // // 最热
  // fetchHotData: function () {  //获取最热列表
  //     let _this = this;
  //     wx.showToast({
  //         title: '加载中',
  //         icon: 'loading'
  //     })
  //     const perpage = 10;
  //     this.setData({
  //         page: this.data.page + 1
  //     })
  //     const page = this.data.page;
  //     const newlist = [];
  //     for (var i = (page - 1) * perpage; i < page * perpage; i++) {
  //         newlist.push({
  //             "id": i + 1,
  //             "name": "上海拜特信息技术有限公司上海拜特信息上海拜特信息技术有限公司" + (i + 1),
  //             "price": "122",
  //             "img": "https://qncdn.playonwechat.com/shangcheng/car.png",
  //             "imgurl": "https://qncdn.playonwechat.com/shangcheng/out3.jpg"
  //         })
  //     }
  //     setTimeout(() => {
  //         _this.setData({
  //             hotlist: _this.data.hotlist.concat(newlist)
  //         })
  //     }, 1500)
  // },
// 加载
onShow: function () {
  wx.showLoading({
    title: '加载中',
  });
  // 轮播
  var that = this;
  //最热列表
  wx.request({
    url: "https://shop.playonwechat.com/api/order-list?sign=" + app.data.sign,
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function (res) {
      console.log("全部",res);
      var newlists = [];
      var orderList = res.data.data.orderList;
      that.setData({
        allData: orderList,
        len: orderList.length
      })
      wx.hideLoading()
    }
  });
},
  
// 切换
tapKeyWorld: function (e) {
  wx.showLoading({
    title: '加载中',
  })

  var that = this;
  var word = e.currentTarget.dataset.status;
  console.log(word);
  this.setData({
    status: word
  })
  setTimeout(function () {
    wx.request({
      url: "https://shop.playonwechat.com/api/order-list?sign=" + app.data.sign,
      data: {
        status: that.data.status
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        // 此处清空全局的数据
        console.log("数据", res);
        var allData = [];
        var orderList = res.data.data.orderList;
        that.setData({
          allData : orderList,
              len : orderList.length
        })
        wx.hideLoading()
      }
    })
  })
},
  //取消订单
  quxiao: function () {
      wx.showModal({
          title: '提示',
          content: '订单还未付款，确认要取消吗？',
          cancelText:'取消订单', 
          confirmText: '再考虑下',
          success: function (res) {
              if (res.confirm) {
                  console.log('success');
              } else if (res.cancel) {
                  console.log('您取消了订单');
                  wx.showToast({
                      title: '您取消了订单',
                      icon: 'loading',
                      duration: 2000
                  })
              }
          }
      })
  },
  //支付
  requestPayment: function () {
      var self = this

      self.setData({
          loading: true
      })
      // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
      // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
      app.getUserOpenId(function (err, openid) {
          if (!err) {
              wx.request({
                  url: paymentUrl,
                  data: {
                      openid
                  },
                  method: 'POST',
                  success: function (res) {
                      console.log('unified order success, response is:', res)
                      var payargs = res.data.payargs
                      wx.requestPayment({
                          timeStamp: payargs.timeStamp,
                          nonceStr: payargs.nonceStr,
                          package: payargs.package,
                          signType: payargs.signType,
                          paySign: payargs.paySign
                      })

                      self.setData({
                          loading: false
                      })
                  }
              })
          } else {
              console.log('err:', err)
              self.setData({
                  loading: false
              })
          }
      })
  },
 

})
