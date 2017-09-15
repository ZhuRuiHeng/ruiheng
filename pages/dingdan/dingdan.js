// pages/dingdan/dingdan.js
//支付
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
var app = getApp();
var main_content = []; 
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
      limit: 1,  //分页
      oid : ''
 },
  

onLoad: function (options) {
  var that = this;
  var nowTime = Date.parse(new Date());
 
  var status = options.status;
  if (status==undefined){
    status = ""
  }
  console.log("status:", status);
  that.setData({
    status:status,
    nowTime: nowTime/1000
  })
  console.log('nowTime:', that.datanowTime);
},

// 加载

onShow: function () {
  var that = this;//在请求数据时setData使用
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  
  console.log("cate_id", that.data.cate_id);
  wx.request({
    url: 'https://shop.playonwechat.com/api/order-list?sign=' + app.data.sign,
    data: {
      status: that.data.status
    },
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function (res) {
      console.log("订单列表", res)
      // 获取用户名称及发表时间
      var newlists = [];
      var orderList = res.data.data.orderList;
      console.log("orderList", res.data.data.orderList);
      that.setData({
        main_content: orderList,
        len: orderList.length
      })
      wx.hideLoading()
    }
  });
}, 
// 下拉分页
onReachBottom: function () {
  var that = this;
  var oldOrderList = that.data.main_content;
  console.log("oldOrderList:" + oldOrderList);
  var orderList = [];
  var oldPage = that.data.limit;
  var reqPage = oldPage + 1;
  wx.request({
    url: "https://shop.playonwechat.com/api/order-list?sign=" + app.data.sign,
    data: {
      limit: reqPage,
      status: that.data.status
    },
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function (res) {
      console.log('新res', res);
      var orderList = res.data.data.orderList;
      if (res.data.data.length == 0) return;
      var limit = oldPage + 1;
      // 获取用户名称及发表时间
      that.setData({
        limit: limit
      });
      // var contentTip = res.data.data.orderList;
      var newContent = oldOrderList.concat(orderList);
      that.setData({
        main_content: newContent
      });
      console.log("newContent:" + that.data.main_content)
    },
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
        var main_content = [];
        var orderList = res.data.data.orderList;
        that.setData({
          main_content : orderList,
              len : orderList.length
        })
        wx.hideLoading()
      }
    })
  })
},
pintuan: function (event) {
  console.log(event);
    var that = this;
    var gbid = event.currentTarget.dataset.gbid;
    var gid = event.currentTarget.dataset.gid;
    
    console.log(gbid);
    console.log('222',gid);
    that.setData({
      gbid: event.currentTarget.dataset.gbid,
      gid: event.currentTarget.dataset.gid
    })
    wx.navigateTo({
      url: '../pintuanxiangqing/pintuanxiangqing?gbid=' + that.data.gbid + '&gid=' + that.data.gid
    })   
},
  //取消订单
shouhuo: function (event) {
    var that = this;
    console.log(event);
    var id = event.currentTarget.id;
    console.log("oid", id);
    that.setData({
      id: event.target.id
    })
   wx.showModal({
      title: '提示',
      content: '请您收到货后点击“确认收货”，否则钱货两空！',
        cancelText:'取消', 
        confirmText: '确认收货',
        success: function (res) {
          console.log(res);
            if (res.confirm) {
                wx.request({
                  url: "https://shop.playonwechat.com/api/user-confirm-receipt?sign=" + app.data.sign,
                  data: {
                    oid: that.data.id
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                    // 此处清空全局的数据
                    console.log("数据", res);
                    var status = res.data.data.res;
                    if (status == 1){
                      wx.showToast({
                        title: '确认收货成功',
                        image: '../images/success.png'
                      });
                    }else{
                      wx.showToast({
                        title: '确认收货失败',
                        image: '../images/false.png'
                      });
                    }
                  }
                })
          } else if (res.cancel) {
              console.log('您取消了确认收货');
              wx.showToast({
                title: '您取消了确认收货',
                  icon: 'loading',
                  duration: 2000
              })
          }
        }
    })
  },

 

})
