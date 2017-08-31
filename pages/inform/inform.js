// pages/inform/inform.js
var common = require('../../common.js');

Page({
    onLoad: function (options) {
        var that = this;
        var id = options.id;//列表页传来的id
        console.log(id);
    },
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['../images/1.jpg'
      , '../images/2.jpg'
      , '../images/3.jpg'
      , '../images/4.jpg'
    ],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      addCar: false,//打开购物车
      closeCar: false,//关闭购物车
      price: 1,//购物车数量
      minusStatus: 'disabled',//数量为1禁用
      sum: '',//购物车id
      _num: 1 //类型
  },
  //轮播图预览
  imgPreview: function () { //图片预览
      const imgs = this.data.imgUrls;
      console.log("const");
      wx.previewImage({
          current: imgs[this.data.currentIndex], // 当前显示图片的http链接
          urls: imgs // 需要预览的图片http链接列表
      })
  },
  //购物车
  addCar: function (obj) {
      console.log('addcar');
      wx.showToast({
          title: '加载中',
          icon: 'loading'
      });
      var sum = obj.target.id;
      console.log('sum' + sum);
      var that = this;
      that.setData({
          addCar: true,
          sum: sum
      })
  },
  //选择型号
  xuanze: function (e) {
      console.log(e.target.dataset.num)
      this.setData({
          _num: e.target.dataset.num
      })
  },
  closeCar: function (obj) {
      console.log('closeCar');
      var id = obj.target.id;
      console.log(id);
      var that = this;
      that.setData({
          addCar: false
      })
  },
  /* 点击减号 */
  bindMinus: function () {
      //console.log('-');
      var price = this.data.price;
      // 如果大于1时，才可以减 
      if (price > 1) {
          price--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态 
      var minusStatus = price <= 1 ? 'disabled' : 'normal';
      // 将数值与状态写回 
      this.setData({
          price: price,
          minusStatus: minusStatus
      });
  },
  /* 点击加号 */
  bindPlus: function () {
      //console.log('+');
      var price = this.data.price;
      // 不作过多考虑自增1 
      price++;
      // 只有大于一件的时候，才能normal状态，否则disable状态 
      var minusStatus = price < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回 
      this.setData({
          price: price,
          minusStatus: minusStatus
      });
  },
  //下一步
  xiayibu: function (){
   wx.navigateTo({
     url: '../dingdanInform/dingdanInform'
    })
  },
  // 返回首页
  backHome: function () {
      common.backHome();
  },
  /**
   * 生命周期函数--监听页面加载
   */
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})