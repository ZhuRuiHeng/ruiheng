// pages/dingdan/dingdan.js
//支付
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
Page({
  /**
   * 页面的初始数据
   */
  data: {
      selected: true,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      hotlist: [], //最热列表
      newlist: [], //最新列表
      page: 0  //分页
  },
  //最新最热
  selected: function (e) {
      this.setData({
          selected1: false,
          selected2: false,
          selected3: false,
          selected4: false,
          selected: true
      })
  },
  selected1: function (e) {
    this.setData({
        selected: false,
        selected2: false,
        selected3: false,
        selected4: false,
        selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
        selected: false,
        selected1: false,
        selected3: false,
        selected4: false,
        selected2: true
    })
  }, 
  selected3: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected4: false,
      selected3: true
    })
  }, 
  selected4: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true
    })
  }, 
onLoad: function () { //加载数据渲染页面
console.log('onload');
    this.fetchHotData(); //最热
    this.fetchNewData(); //最新
},
  // 最热
  fetchHotData: function () {  //获取最热列表
      let _this = this;
      wx.showToast({
          title: '加载中',
          icon: 'loading'
      })
      const perpage = 10;
      this.setData({
          page: this.data.page + 1
      })
      const page = this.data.page;
      const newlist = [];
      for (var i = (page - 1) * perpage; i < page * perpage; i++) {
          newlist.push({
              "id": i + 1,
              "name": "上海拜特信息技术有限公司上海拜特信息上海拜特信息技术有限公司" + (i + 1),
              "price": "122",
              "img": "../images/car.png",
              "imgurl": "../images/out3.jpg"
          })
      }
      setTimeout(() => {
          _this.setData({
              hotlist: _this.data.hotlist.concat(newlist)
          })
      }, 1500)
  },
  // 最新
  fetchNewData: function () {  //获取最新列表
      let _this = this;
      wx.showToast({
          title: '加载中',
          icon: 'loading'
      })
      const perpage = 10;
      this.setData({
          page: this.data.page + 1
      })
      const page = this.data.page;
      const newlist = [];
      for (var i = (page - 1) * perpage; i < page * perpage; i++) {
          newlist.push({
              "id": i + 1,
              "name": "深圳龙岗深圳宝安信息技术有限公司信息技术有限公司" + (i + 1),
              "price": "222.00",
              "img": "../images/car.png",
              "imgurl": "../images/out2.jpg"
          })
      }
      setTimeout(() => {
          _this.setData({
              newlist: _this.data.newlist.concat(newlist)
          })
      }, 1500)
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
  }

})