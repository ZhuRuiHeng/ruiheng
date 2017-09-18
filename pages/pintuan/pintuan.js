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
    search_word:[],
    limit: 1
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
    var search_word = [];
    for (var i = 0; i < that.data.search_word.length; i++) {
      search_word.push(that.data.search_word[i]);
    }
    var width = 130 * that.data.search_word.length;
    wx.request({
      url: 'https://shop.playonwechat.com/api/fight-group-list?sign=' + app.data.sign,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("团购列表", res)
        console.log(res.data.data.fightGroupList);
        that.setData({
          main_content: res.data.data.fightGroupList
        })
        wx.hideLoading()
      }
    });
    that.setData({
      search_word: search_word,
      w_width: width
    })
    // 导航
    wx.request({
      url: 'https://shop.playonwechat.com/api/get-category?sign=' + app.data.sign,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("导航列表", res);
        var search_word =res.data.categorys;
        console.log("search_word:", search_word);
        var len = search_word.length;
        var width = 130 * len;
        console.log("width", width);
        that.setData({
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
    var ontap = e.currentTarget.dataset.ontap;
    var search_word = that.data.search_word;
    that.setData({
      cate_id: ontap
    })
    setTimeout(function () {
      
      for (var i = 0; i < search_word.length; i++) {
        search_word[i].active = false;
        if (ontap == search_word[i].cate_id) {
          search_word[i].active = true;
        }
      }
      that.setData({
        search_word: search_word
      })
      wx.request({
        url: "https://shop.playonwechat.com/api/fight-group-list?sign=" + app.data.sign,
        data: {
          cate_id: that.data.cate_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("切换数据", res);
          // 此处清空全局的数据
          var main_content = "";
          that.setData({
            main_content: res.data.data.fightGroupList
          })
          wx.hideLoading()
        }
      })
    }, 300)

  },
  // 下拉分页
  onReachBottom: function () {
    console.log("下拉......");
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var that = this;
    var oldGoodsList = that.data.main_content;
    var goodsList = [];
    var oldPage = that.data.limit;
    var reqPage = oldPage + 1;
    wx.request({
      url: "https://shop.playonwechat.com/api/fight-group-list?sign=" + app.data.sign,
      data: {
        limit: reqPage,
        cate_id: that.data.cate_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log('新res', res);
        var goodsList = res.data.data.goodsList;
        if (res.data.data.length == 0) return;
        var page = oldPage + 1;
        // 获取用户名称及发表时间
        that.setData({
          limit: limit
        });
        // var contentTip = res.data.data.goodsList;
        var newContent = oldGoodsList.concat(goodsList);

        that.setData({
          main_content: newContent
        });
        wx.hideLoading();
      },
    });
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