// pages/my/my.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        list:[
           {
               pic:'https://qncdn.playonwechat.com/shangcheng/fu.png',
               title:'代付款',
               url:'../index/index',
               num:'1'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/fa.png',
               title: '代发货',
               url: '../index/index',
               num: '2'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/shou.png',
               title: '代收款',
               url: '../index/index',
               num: '13'
           },
           {
               pic: 'https://qncdn.playonwechat.com/shangcheng/finish.png',
               title: '已完成',
               url: '../index/index',
               num: '4'
           }

        ]
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    //拨打电话
    makePhoneCall: function () {
        wx.makePhoneCall({
            phoneNumber: '12345678900', //此号码并非真实电话号码，仅用于测试
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    },
    //
    dingdan:function(){
        wx.navigateTo({
            url: '../dingdan/dingdan'
        })
    },
    payCar:function(){
        console.log('car');
        wx.switchTab({
            url: '../car/car'
        })
    },
    onLoad: function () {
        console.log('onLoad');
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        });
        
    }
})
