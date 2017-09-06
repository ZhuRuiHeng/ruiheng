// pages/inform/inform.js
var common = require('../../common.js');
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: [],
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
  onLoad: function (options) {
    var that = this;
    var gid = options.gid;//列表页传来的id
    console.log("gidqqqqq", gid);
    this.setData({
      gid: gid,
    });
  },
  onShow: function (options) {
    var that = this;
    var gid = that.data.gid;//列表页传来的id
    wx.request({
      url: "https://shop.playonwechat.com/api/goods-detail?sign=" + app.data.sign,
      data: {
        gid: gid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("详情", res);
        var list = [];
        // 获取用户名称及发表时间
        var  inform = res.data.data.goodsDetail;
        var picture = inform.picture;
        var informImg = inform.content;
        var shuxing = inform.attribute;
        console.log('shuxing', inform.attribute );
        that.setData({
          inform: inform,
          imgUrls: picture,
          informImg: informImg,
          attribute:shuxing
        })
        wx.hideLoading()
      }
    })
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
  // addCar: function (obj) {
  //     console.log('addcar');
  //     wx.showToast({
  //         title: '加载中',
  //         icon: 'loading'
  //     });
  //     var sum = obj.target.id;
  //     console.log('sum' + sum);
  //     var that = this;
  //     that.setData({
  //         addCar: true,
  //         sum: sum
  //     })
  // },
  addCar: function (e) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    var that = this;
    var gid = e.currentTarget.dataset.gid
    console.log("gid", gid);
    that.setData({
      _gid: gid
    })
    wx.request({
      url: "https://shop.playonwechat.com/api/goods-detail?sign=" + app.data.sign,
      data: {
        gid: that.data._gid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("详情", res);
        var list = [];
        // 获取用户名称及发表时间
        var inform = res.data.data.goodsDetail;
        //infoem.attribute
        that.setData({
          addCar: true,
          inform: inform
        })
        wx.hideLoading()
      }
    })
  },
  tianjia:function(){
    wx.switchTab({
      url: '../car/car'
    })
  },
  // // 冒泡到leibieall
  // leibieall:function(e){
  //   var that = this;
  //     var allindex = e.currentTarget.dataset.anid;
  //     that.setData({
  //       allindex: allindex
  //     })
  // },
  // //选择型号
  // xuanze: function (e) {
  //   var priceGroup = [];
  //   var that = this;
  //   setTimeout(function (){
  //     var allindex = that.data.allindex;
  //     console.log(allindex);
  //     console.log(e.target.dataset.num);
  //     that.setData({
  //       _num: e.target.dataset.num
  //     })
  //   },300) 
  // },

  leibieall: function (e) {
    console.log("e", e)
    var anids = e.currentTarget.dataset.anid;
    this.setData({
      anids: anids,
    });
    console.log("this.index", this.data.anids);
  },
  //选择型号
  xuanze: function (e) {
    var that = this;
    var attribute = [];
    setTimeout(function () {
      var anids = that.data.anids;//索引
      var active2 = e.currentTarget.dataset.active; //状态
      var avid = e.target.dataset.avid;//值
      var _attribute = that.data.inform.attribute;
      var _inform = that.data.inform;
      //console.log("_attribute", _attribute) 
      console.log("参数", anids, avid);
      ///////////    
      var attribute_value = _attribute[anids - 1].attribute_value;
      console.log("attribute_value", attribute_value);
      console.log(attribute_value.length);
      for (var j = 0; j < attribute_value.length; j++) {
        attribute_value[j].active = false;
        if (avid == attribute_value[j].avid) {
          attribute_value[j].active = true;
          console.log(attribute_value[j].active);
          var avid1 = attribute_value[j].avid;
          console.log(avid1);
          setTimeout(function () {
            if (anids == 1) {
              that.setData({
                one: avid
              })
            } else if (anids == 2) {
              that.setData({
                two: avid
              })
            } else if (anids == 3) {
              that.setData({
                three: avid
              })
            }
          }, 100)
        }
      }

      that.setData({
        inform: _inform
      })
      ///////////////
      //attribute = ["attr-" + 1 + ":" + that.data.one + "," + 2 + ":" + that.data.two + "," + 3 + ":" + that.data.three]
      attribute = [1 + ":" + that.data.one + "," + 2 + ":" + that.data.two + "," + 3 + ":" + that.data.three]
      console.log("attribute111:", attribute);
      that.setData({
        _num: e.target.dataset.avid,
        attribute: attribute
      })
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