// pages/pintuan/pintuan.js
var list = [], that, data, listadd, limit = 1;
// var common = require('../../common.js');
var app = getApp();
var main_content = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_word: [],
    limit: 1,
    results:[]
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      cate_id: options.gid
    })
  },


  onReady: function () {

  },
  onShow: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var that = this;
    // 列表
    wx.request({
      url: 'https://shop.playonwechat.com/api/second-kill-list?sign=' + app.data.sign,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("秒杀列表", res);
        var seckills = res.data.data.seckills;
        console.log('len:',seckills.length);
        var results = [];
        for (var i = 0; i < seckills.length;i++){
          //results.push(parseInt(seckills[i].sales_volume) / parseInt(seckills[i].stock));
          results.push(Math.round(parseInt(seckills[i].sales_volume) / parseInt(seckills[i].stock) * 10000) / 100.00 + "%"); //小数点后两位百分比
        }
        console.log('results:',results);
        that.setData({
          main_content: res.data.data.seckills,
          description: res.data.data.description,
          nextSeckillTime: res.data.data.nextSeckillTime,
          results : results
        })
        wx.hideLoading()
      }
    });
    //导航https://shop.playonwechat.com/api/second-kill-times
    wx.request({
      url: 'https://shop.playonwechat.com/api/second-kill-times?sign=' + app.data.sign,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("导航列表", res);
        var search_word = res.data.data.time_intervals;
        var search_word1 = [];
        var search_word2 = [];
        var today = search_word.today;
        var tomorrow = search_word.tomorrow;
        var yesterday = search_word.yesterday;
        console.log("导航列表", search_word);
        var len = today.length + tomorrow.length + yesterday.length+2;
        console.log("wwwww", len);
        var width = 130 * len;
        console.log("width", width);
        search_word1.push(search_word2);
        that.setData({
          time_intervals: res.data.data.time_intervals,
          search_word: search_word,
          w_width: width
        })
        wx.hideLoading()
      }
    });
},
// 点击切换
  tapKeyWorld: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var star = e.currentTarget.dataset.star;
    console.log(star);
    that.setData({
      activity_begin: star
    })
    setTimeout(function () {
     
      wx.request({
        url: "https://shop.playonwechat.com/api/second-kill-list?sign=" + app.data.sign,
        data: {
          activity_begin: that.data.activity_begin
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("切换", res);
          // 此处清空全局的数据
          var seckills = res.data.data.seckills;
          var main_content = "";
          that.setData({
            main_content: seckills
          })
          wx.hideLoading()
        }
      })
    }, 300)

  },
  // 下拉分页
  // onReachBottom: function () {
  //   console.log("下拉......");
  //   wx.showToast({
  //     title: '加载中',
  //     icon: 'loading'
  //   })
  //   var that = this;
  //   var oldGoodsList = that.data.main_content;
  //   console.log("oldGoodsList:" + oldGoodsList);
  //   var goodsList = [];
  //   var oldPage = that.data.limit;
  //   var reqPage = oldPage + 1;
  //   wx.request({
  //     url: "https://shop.playonwechat.com/api/second-kill-list?sign=" + app.data.sign,
  //     data: {
  //       limit: reqPage,
  //       cate_id: that.data.cate_id
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     method: "GET",
  //     success: function (res) {
  //       console.log('新res', res);
  //       var goodsList = res.data.data.goodsList;
  //       if (res.data.data.length == 0) return;
  //       var page = oldPage + 1;
  //       // 获取用户名称及发表时间
  //       that.setData({
  //         limit: limit
  //       });
  //       // var contentTip = res.data.data.goodsList;
  //       var newContent = oldGoodsList.concat(goodsList);

  //       that.setData({
  //         main_content: newContent
  //       });
  //       wx.hideLoading()
  //       console.log("newContent:" + that.data.newContent)
  //     },
  //   });
  // },
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