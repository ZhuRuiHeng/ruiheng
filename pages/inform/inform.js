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
      imgUrls: [{
          img: 'http://yanxuan.nosdn.127.net/e5891a68df93c5ee57ddb5b256068dac.jpg'
      }, {
          img: 'http://yanxuan.nosdn.127.net/90f6c228c71cb9aba926de824e71e78d.jpg'
      }, {
          img: 'http://yanxuan.nosdn.127.net/e5891a68df93c5ee57ddb5b256068dac.jpg'
      }, {
          img: 'https://img.yzcdn.cn/upload_files/2017/08/15/Flm3ribz-z6d2bzBZyWSt0jFUC07.gif?imageView2/2/w/730/h/0/q/75/format/gif'
      }],
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
  /**
   * 生命周期函数--监听页面加载
   */
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})