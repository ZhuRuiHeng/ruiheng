//获取应用实例  
// pages/inform/inform.js
var id, url1, url2, list = [], that, data, listadd, limit = 1;
// var common = require('../../common.js');
var app = getApp();
var url = 'https://shop.playonwechat.com/api/goods-list?';
 
Page({
    data: {
      cate_id:''
    },
    onLoad: function (options) {
      console.log(options);
      this.setData({
        cate_id: options.cate_id
      })
    },
    onReachBottom: function () {
      console.log('上拉');
    },
    onShow: function () {
        // 页面初始化 options为页面跳转所带来的参数
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        that = this;//在请求数据时setData使用
        console.log("cate_id",that.data.cate_id);
        url1 = url;
        queryRequest(url1);
    },
    lower: function (e) {
        console.log('下拉');
        limit = limit++;
        console.log(limit);
        url2 = url2 = url1 + "limit" + limit;
        getmoreRequest(url2);
    }
}) 
//请求数据
// wx.request({
//   url: 'https://shop.playonwechat.com/api/carousel-goods?sign=' + sign,
//   header: {
//     'content-type': 'application/json'
//   },
//   method: "GET",
//   success: function (res) {
//     var imgUrls1 = res.data.data.carouselGoods;
//     var lunbo = [];
//     // 获取用户名称及发表时间
//     that.setData({
//       lunbo: imgUrls1
//     })
//   }
// });
function queryRequest(url) {
    wx.request({
        url: url,
        data: {
          sign: app.data.sign,
          cate_id:that.data.cate_id
        },
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            // success
            console.log(res);
            list = res.data.data.goodsList;
            that.setData({
                list: list
            })
        }
    })
}

//下拉加载的请求
function getmoreRequest(url) {
    var that = this;
    wx.request({
        url: url,
        data: {
          sign: app.data.sign,
          cate_id: that.data.cate_id
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            // success
             console.log(res.data);
            listadd = res.data.data.list
            data = res.data.data
            // list.post(listadd)
            for (var i = 0; i < listadd.length; i++) {
                var a = timeString(listadd[i].loantime);
                listadd[i].time = a;
                listadd[i].title = listadd[i].tname;
                listadd[i].price = listadd[i].id;
                console.log(listadd[i].price)
            }
            list = list.concat(listadd)
            // console.log(list)
            console.log(list.length)
            that.setData({
                list: list
            })
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}

 

//时间戳转换为时间
function timeString(time) {
    var newDate = new Date();
    newDate.setTime(time);
    // console.log(newDate.toLocaleDateString());
    var result = newDate.toLocaleDateString();
    return result;
}
