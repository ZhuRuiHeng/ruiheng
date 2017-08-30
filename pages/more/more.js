//获取应用实例  
// pages/inform/inform.js
var id, url1, url2, list = [], that, data, listadd, pageNum = 1;
var common = require('../../common.js');
var url = "http://my.ganjiangps.com/send/moremoneyclk.action?";
 
Page({
    data: {},

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        that = this;//在请求数据时setData使用
        id = options.id;//options.id为上个页面传来的参数
        // console.log(id)
        url1 = url;
        queryRequest(url1);
    },
    lower: function (e) {
        console.log('下拉');
        pageNum = pageNum++;
        console.log(pageNum);
        url2 = url2 = url1 + "pageNum" + pageNum;
        getmoreRequest(url2);
    }
}) 
//请求数据
function queryRequest(url) {
    wx.request({
        url: url,
        data: {},
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            // success
            console.log(res.data);
            data = res.data;
            list = res.data.list;
             console.log(list);
            for (var i = 0; i < list.length; i++) {
                var a = timeString(list[i].loantime);
                list[i].time = a;
                list[i].title = list[i].tname;
                list[i].price = list[i].id;
                console.log(list[i].price)
                // console.log(list[i].time)
            }
            that.setData({
                list: list
            })
        }
    })
}

//下拉加载的请求
function getmoreRequest(url) {
    wx.request({
        url: url,
        data: {},
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
