//获取应用实例  
// pages/inform/inform.js
var common = require('../../common.js');
var app = getApp();
var pageNum = 1
var url = "http://my.ganjiangps.com/send/moremoneyclk.action?";
var GetList = function (that) {
    that.setData({
        hidden: false
    });
    wx.request({
        url: url,
        data: {
            pageSize: 5,
            pageNo: pageNum
        },
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            console.log(res.data);
            var l = res.data.data;
            console.log(l);
            for (var i = 0; i < res.data.data.length; i++) {
                l.push(res.data[i])
            }
            that.setData({
                list: l
            });
            console.log('list'+list);
            pageNum++;
            that.setData({
                hidden: true
            });
        }
    });
}  
Page({
    data: {
        list: []  
    },

    onLoad: function (options) {
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        // 页面初始化 options为页面跳转所带来的参数  
        var that = this
        GetList(that)
    },
    onPullDownRefresh: function () {
        //下拉  
        console.log("下拉");
        pageNum = 1;
        this.setData({
            list: [],
        });
        var that = this
        GetList(that)
    },
    onReachBottom: function () {
        //上拉  
        console.log("上拉")
        var that = this
        GetList(that)
    },
      // 返回首页
    backHome: function () {
        common.backHome();
    },
})