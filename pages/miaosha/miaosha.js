// pages/pintuan/pintuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    "search_word": [
      {
        "id": "1",
        "ma_desc": "祛痘"
      },
      {
        "id": "2",
        "ma_desc": "护肤"
      },
      {
        "id": "3",
        "ma_desc": "美白"
      },
      {
        "id": "4",
        "ma_desc": "眼部"
      },
      {
        "id": "5",
        "ma_desc": "祛皱"
      },
      {
        "id": "6",
        "ma_desc": "淡斑"
      },
      {
        "id": "7",
        "ma_desc": "保湿"
      },
      {
        "id": "8",
        "ma_desc": "防晒"
      },
      {
        "id": "9",
        "ma_desc": "清洁"
      },
      {
        "id": "10",
        "ma_desc": "化妆"
      }
    ]
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var search_word = [];
    for (var i = 0; i < that.data.search_word.length; i++) {
      search_word.push(that.data.search_word[i]);
    }
    var width = 130 * that.data.search_word.length;
    that.setData({
      search_word: search_word,
      w_width: width
    })
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