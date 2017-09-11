//获取应用实例  
// pages/inform/inform.js
var id, url1, url2, list = [], that, data, listadd, limit = 1;
// var common = require('../../common.js');
var app = getApp();
var main_content = []; 
Page({
    data: {
      cate_id:'',
      limit: 1
    },
    onLoad: function (options) {
      console.log(options);
      this.setData({
        cate_id: options.cate_id
      })
    },
 
    onShow: function () {
        // 页面初始化 options为页面跳转所带来的参数
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        that = this;//在请求数据时setData使用
        console.log("cate_id",that.data.cate_id);
        wx.request({
          url: 'https://shop.playonwechat.com/api/goods-list?sign=' + app.data.sign,
          data: {
            cate_id: that.data.cate_id
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("知识列表", res)
            // 获取用户名称及发表时间
            var goodsList = res.data.data.goodsList;
            that.setData({
              "main_content": goodsList
            })
            wx.hideLoading()
          }
        });
    },
    // 下拉分页
    onReachBottom: function () {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      var that = this;
      var oldGoodsList= that.data.main_content;
      console.log("oldGoodsList:" + oldGoodsList);
      var goodsList = [];
      var oldPage = that.data.limit;
      var reqPage = oldPage + 1;
      wx.request({
        url: "https://shop.playonwechat.com/api/goods-list?sign=" + app.data.sign,
        data: {
          limit: reqPage,
          cate_id: that.data.cate_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log('新res',res);
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
            "main_content": newContent
          });
          wx.hideLoading()
          console.log("newContent:" + that.data.newContent)
        },
      });
    },
}) 

//时间戳转换为时间
function timeString(time) {
    var newDate = new Date();
    newDate.setTime(time);
    var result = newDate.toLocaleDateString();
    return result;
}
