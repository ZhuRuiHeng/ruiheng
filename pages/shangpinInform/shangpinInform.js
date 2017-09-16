// pages/dingdanInform/dingdanInform.js
//支付
var common = require('../../common.js');
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
var app = getApp();

Page({
  data: {
    oid: "",
    list:'',
    goods_list:'',
    status1:'',
    countDown_tatic: false,
    Countdown: [{
      day: "",
      hr: "",
      min: "",
      sec: ""
    }]
  },
  onLoad: function (options) {
    console.log(options);
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
        console.log('res:',res);
        var list = res.data.data.orderDetail;
        console.log("list", list);
        // 获取用户名称及发表时间
        var goods_list = list.goods_list;
        var begin_time = list.order_time;
        
        //倒计时
        var xiaTime = (new Date(list.order_time)).getTime() / 1000;//下单时间
        var begin_time = xiaTime + 1800; //超时时间
        var nowTime = Date.parse(new Date()); //现在时间
        // console.log('nowTime1:', nowTime1 / 1000);

        console.log('11111', nowTime, +'||' + begin_time);
        var ge_nowTime = common.time(nowTime / 1000, 1); // 下单时间
        var be_gainTime = common.time(begin_time, 1);  //超时时间
        console.log('22222', ge_nowTime, +'||' + be_gainTime);
        var Countdown = begin_time * 1000 - nowTime; //倒计时
        if (Countdown > 0) {
          function dateformat(micro_second) {
            // 秒数
            var second = Math.floor(micro_second / 1000);
            // 小时位
            var day = Math.floor(second / 86400);

            if (day < 10) {
              day = '0' + day;
            }

            var hr = Math.floor((second - day * 86400) / 3600);
            // 分钟位
            if (hr < 10) {
              hr = '0' + hr;
            }

            var min = Math.floor((second - hr * 3600 - day * 86400) / 60);
            if (min < 10) {
              min = '0' + min;
            }
            // 秒位
            var sec = (second - hr * 3600 - min * 60 - day * 86400); // equal to => var sec = second % 60;
            // 毫秒位，保留2位
            if (sec < 10) {
              sec = '0' + sec;
            }
            var micro_sec = Math.floor((micro_second % 1000) / 10);

            return day + ":" + hr + ":" + min + ":" + sec;
          }

          setInterval(function () {
            Countdown -= 1000;
            var time = dateformat(Countdown);
            var splitArr = time.split(":");
            // console.log(splitArr);
            var _Countdown = [{
              day: splitArr[0],
              hr: splitArr[1],
              min: splitArr[2],
              sec: splitArr[3],
            }];
            // console.log(_Countdown);
            that.setData({
              countDown_tatic: true,
              Countdown: _Countdown
            })
          }, 1000)

        } else {
          countDown_tatic: false
        }

        begin_time = common.time(begin_time, 1);
        console.log(begin_time);
        console.log(that.data.Countdown);
        /////////////////////////////////////////////
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