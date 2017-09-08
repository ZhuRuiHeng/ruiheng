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
 },
  

onLoad: function (options) {
  console.log(options.status);
  this.setData({
    status: options.status
  })
},
// 加载
onShow: function () {
  wx.showLoading({
    title: '加载中',
  });
  // 轮播
  var that = this;
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
      //console.log("全部",res);
      var newlists = [];
      var orderList = res.data.data.orderList;
      console.log("orderList", res.data.data.orderList);
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

 

})
