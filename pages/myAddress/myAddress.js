// pages/myAddress/myAddress.js
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  // 编辑地址
  bianji: function (obj){
    var that = this;
    var id = obj.currentTarget.id
    wx.navigateTo({ 
      url: '/pages/newAddress/newAddress?id=' + id
    }) 
  },
  // 新增地址
  newAddress: function (obj){
    var id = obj.currentTarget.id
    wx.navigateTo({
      url: '/pages/newAddress/newAddress?id=' + id
    }) 
  },

  /* 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})