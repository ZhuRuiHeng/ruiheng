// pages/dingdanInform/dingdanInform.js
//支付
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
var app = getApp();
Page({
  data: {
    oid: "",
    list:'',
    goods_list:''
  },
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      oid: options.oid,
    })
  },

  onShow: function () {
    var that = this;
    var dizhi = wx.getStorageSync("dizhi");
    console.log(dizhi);
    if (dizhi != undefined) {
      that.setData({
        dizhi: dizhi
      })
    } else {
      console.log("请选择地址")
    }
    // 详情
    wx.request({
      url: "https://shop.playonwechat.com/api/order-detail?sign=" + app.data.sign,
      data: {
        oid: that.data.oid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var list = res.data.data.orderDetail;
        console.log("list", list);
        // 获取用户名称及发表时间
        var goods_list = list.goods_list;
        that.setData({
          list : list,
          goods_list: list.goods_list
        })
        console.log(goods_list);
        wx.hideLoading()
      }
    })
  },
  //地址
  nextAddress: function () {
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          that.setData({
            dizhi: res
          })
          wx.setStorageSync('dizhi', res);
          console.log(res);
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // switch
  listenerSwitch: function (e) {
    console.log('switch类型开关当前状态-----', e.detail.value);
  },
  //input
  // userMesInput: function (e) {
  //   var that = this;

  //   var userMes = that.data.userMes;
  //   that.setData({
  //     userMes: e.detail.value
  //   })
  //   console.log(userMes);
  // },
  //提交订单
  formSubmit: function (e) {
    var that = this;
    wx.request({
      url: 'https://shop.playonwechat.com/api/create-order?sign=' + app.data.sign,
      data: {
        form_id: e.detail.formId,
        receiver: that.data.dizhi.userName,
        message: that.data.userMes,//留言
        receiver_address: that.data.dizhi.provinceName + that.data.dizhi.cityName + that.data.dizhi.countyName + that.data.dizhi.detailInfo,
        receiver_phone: that.data.dizhi.telNumber,
        detail: that.data.detail
      },
      //detail:"gid -   attribute   - number"
      //detail:" 1  -  1:2,2:4,3:6  - 1"
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res);
      },
      fail: function (res) {
        // fail
        console.log(res)
      },
      complete: function () {
        // complete
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
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})