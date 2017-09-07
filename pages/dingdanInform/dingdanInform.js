// pages/dingdanInform/dingdanInform.js
var app = getApp();
Page({
  data: {
    gid : "",
    attr : "",
    types:""
  },
  onLoad: function (options) {
      console.log(options);
      var that = this;
      //this.nextAddress();
      that.setData({
        gid: options.gid,
        price: options.price,
        attr: options.attr,
        types: options.types
      })
      var gid = that.data.gid;//列表页传来的
      var price = that.data.price;
      console.log(gid);
      console.log("types", options.types);
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
//提交订单
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail)
    console.log('form_id：', e.detail.formId);
    console.log(that.data.dizhi.userName);
    console.log(that.data.dizhi.telNumber);
    console.log(that.data.dizhi.provinceName + that.data.dizhi.cityName + that.data.dizhi.countyName + that.data.dizhi.detailInfo);
    wx.request({
      url: 'https://shop.playonwechat.com/api/create-order?sign=' + app.data.sign,
      data: {
        form_id: e.detail.formId,
        receiver: that.data.dizhi.userName,
        message:'234235',//留言
        receiver_address: that.data.dizhi.provinceName + that.data.dizhi.cityName + that.data.dizhi.countyName + that.data.dizhi.detailInfo,
        receiver_phone: that.data.dizhi.telNumber,
        detail: "1-1:2,2:4,3:6-1;1-1:1,2:4,3:6-2"
      },
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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