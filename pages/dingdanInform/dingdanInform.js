// pages/dingdanInform/dingdanInform.js
var app = getApp();
Page({
  data: {
    gid : ""
  },
  onLoad: function (options) {
      console.log(options);
      var that = this;
      that.setData({
        gid: options.gid,
        price: options.price
      })
      var gid = that.data.gid;//列表页传来的
      var price = that.data.price;
      console.log(gid);
      console.log("price", price);
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
          console.log("详情", res);
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
      
  },
  nextAddress:function(){
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(res.userName);
          console.log(res.postalCode);
          console.log(res.provinceName);
          console.log(res.cityName);
          console.log(res.countyName);
          console.log(res.detailInfo);
          console.log(res.nationalCode);
          console.log(res.telNumber);
          that.setData({
              dizhi:res
          })
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