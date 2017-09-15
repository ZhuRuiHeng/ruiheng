// pages/pintuanxiangqing/pintuanxiangqing.js
var common = require('../../common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var gbid = options.gbid;
    that.setData({
        _gbid: gbid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var nowTime = Date.parse(new Date());
    console.log('nowTime:', nowTime / 1000);
    this.setData({
      nowTime: nowTime / 1000
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var midNew = wx.getStorageSync("mid");
    that.setData({
      midNew: midNew
    });
    console.log("midNew:", midNew);
    wx.request({
      url: "https://shop.playonwechat.com/api/group-detail?sign=" + app.data.sign,
      data: {
        gbid: that.data._gbid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("拼团详情数据", res);
        // 此处清空全局的数据
        var groupDetail = "";
        that.setData({
          res: res,
          groupDetail: res.data.data.groupDetail,
          mid: res.data.data.groupDetail.mid
        })
        wx.hideLoading()
      }
    })
  },
  guize: function (e) {
    console.log(e);
    var url = getCurrentPages();
    console.log(url);
    wx.navigateTo({
      url: '../guize/guize'
    })
  },
   // url: '../shangpinInform/shangpinInform?oid='+order_id+'&status1='+status+'&gbid='+gbid
  chakan: function () {
    var url = getCurrentPages();
    console.log(url);
    wx.navigateTo({
      url: '../shangpinInform/shangpinInform'
    })
  },
  //分享用户购买
  buy:function(){
    var that = this;
    wx.setStorageSync('groupDetail',that.data.groupDetail);
    wx.navigateTo({
      url: '../TdingdanInform/TdingdanInform?groupDetail=' + that.data.groupDetail + '&type=1'
    })
  },
  // 返回首页
  backHome: function () {
    common.backHome();
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