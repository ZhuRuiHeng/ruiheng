// pages/dingdanInform/dingdanInform.js
//支付
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
var app = getApp();
console.log("sign:",app.data.sign);
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
    // 列表
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
  //提交订单
  formSubmit: function (e) {
    var that = this;
    console.log("oid", that.data.oid)
    wx.request({
      url: 'https://shop.playonwechat.com/api/order-payment?sign=' + app.data.sign,
      data: {
        oid: that.data.oid
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        console.log(res);
        var status = res.data.status;
        if (status == 1) {
          // 调用支付
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign
          })
          // 重置属性
          that.setData({
            gid: "",
            attr: "",//属性
            types: "", //类型
            userMes: '',//留言信息
            num: '', //数量
            detail: '',
            oid : ''
          })

        } else {
          wx.showToast({
            title: '创建订单失败',
            image: '../images/false.png'
          });
        }
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