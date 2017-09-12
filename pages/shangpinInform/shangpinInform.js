// pages/dingdanInform/dingdanInform.js
//支付
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
var app = getApp();
var date = new Date();
console.log('date:',date);
var total_micro_second = 1800 * 1000;
console.log("sign:",app.data.sign);
/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that);
  }
, 10)}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return min + ":" + sec + " " + micro_sec;
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

Page({
  data: {
    oid: "",
    list:'',
    goods_list:'',
    status1:'',
    clock: ''
  },
  onLoad: function (options) {
    console.log(options);
    count_down(this);
    var that = this;
    that.setData({
      oid: options.oid,
      status1: options.status1
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
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
        //console.log(goods_list);
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