// pages/dingdanInform/dingdanInform.js
//支付
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
var app = getApp();
Page({
  data: {
    gid : "",
    attr : "",//属性
    types:"", //类型
    userMes: '',//留言信息
    num:'', //数量
    detail:''
  },
  onLoad: function (options) {
      console.log(options);
      var that = this;
      //this.nextAddress();
      that.setData({
        gid: options.gid,
        num: options.price,
        attr: options.attr,
        types: options.types,
        detail: options.gid + '-' + options.attr + '-' + options.price
      })
      var gid = that.data.gid;//列表页传来的
      var num = that.data.num;
      wx.request({
        url: "https://shop.playonwechat.com/api/goods-detail?sign=" + app.data.sign,
        data: {
          gid: gid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          //console.log("详情", res);
          var list = [];
          // 获取用户名称及发表时间
          var inform = res.data.data.goodsDetail;
          that.setData({
            inform: inform
          })
          wx.hideLoading()
        }
      })
  },
  
  onShow: function () {
    var dizhi = wx.getStorageSync("dizhi");
    console.log(dizhi);
    if (dizhi != undefined){
      console.log(111);
      console.log(dizhi);
    }else{
      console.log(2222);
    }
  },
  //地址
  nextAddress:function(){
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          that.setData({
              dizhi:res
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
  userMesInput: function (e) {
    var that = this;
    
    var userMes = that.data.userMes;
    that.setData({
      userMes: e.detail.value
    })
    console.log(userMes);
  },
//提交订单
  formSubmit: function (e) {
    var that = this;
    wx.request({
      url: 'https://shop.playonwechat.com/api/create-order?sign=' + app.data.sign,
      data: {
        form_id: e.detail.formId,
        receiver: that.data.dizhi.userName,
        message:that.data.userMes,//留言
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