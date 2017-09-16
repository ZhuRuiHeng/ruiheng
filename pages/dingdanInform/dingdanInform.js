// pages/dingdanInform/dingdanInform.js
//支付
const paymentUrl = require('../../config').paymentUrl;
console.log("paymentUrl:" + paymentUrl);
var Zan = require('../../dist/index');
var app = getApp();
Page(Object.assign({}, Zan.Toast, {
  data: {
    gid : "",
    attr : "",//属性
    types:"", //类型
    userMes: '',//留言信息
    num:'', //数量
    detail:''
  },
  onLoad: function (options) {
    console.log('options:',options);
      var that = this;
     // that.showZanToast('1111111111111');
      var attr = options.attr;
      if (attr == undefined){
        var attr = 0;
        that.setData({
          attr : attr,
         })
      }
      console.log("new",that.data.attr);
      //this.nextAddress();
      var _type = options.type;
      if (_type == undefined){
        _type = 0;
      }
      console.log("_type:", _type);
      that.setData({
        gid: options.gid,
        num: options.price,
        types: options.types,
        detail: options.gid + '-' + attr + '-' + options.price,
        low_price: options.low_price,
        type: _type
      })
      var gid = that.data.gid;//列表页传来的
      var num = that.data.num;
      var detail = that.data.detail;
      var type = that.data.type;
      console.log("列表页传来的gid:", gid + '1' + num + '2' + detail +'low_price'+ type)
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
          console.log("详情数据", res);
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
    var that = this;
    //that.showZanToast('222222222222');
    var dizhi = wx.getStorageSync("dizhi");
    console.log(dizhi);
    if (dizhi != undefined){
      console.log(dizhi);
      
      that.setData({
        dizhi: dizhi
      })
    }
    else{
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
   // console.log(userMes);
  },
  
//提交订单
  formSubmit: function (e) {
    var that = this;
    var dizhi = that.data.dizhi;
    console.log("dizhi:", dizhi);
    console.log(dizhi.length);
    
    if (dizhi.length == 0){
      wx.showToast({
        title: '请选择收货地址',
        image: '../images/false.png'
      });
    }else{
      wx.request({
        url: 'https://shop.playonwechat.com/api/create-order?sign=' + app.data.sign+'&type='+that.data.type,
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
          var status = res.data.status;
          if (status == 1) {
            // 调用支付
            wx.requestPayment({
              timeStamp: res.data.data.timeStamp,
              nonceStr: res.data.data.nonceStr,
              package: res.data.data.package,
              signType: res.data.data.signType,
              paySign: res.data.data.paySign,
              'success': function (res) {
                setTimeout(function () {
                  // 支付成功跳转
                  wx.navigateTo({
                    url: '../dingdan/dingdan?status='
                  })
                }, 300)
              },
              'fail': function (res) {
              }
            })
          } else {
            that.showZanToast('创建订单失败');
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
          
        }
      })
    }
    
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
}));