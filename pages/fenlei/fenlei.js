//index.js
var common = require('../../common.js');

//获取应用实例
main_content: [];//最新最热
main_content2: [];//列表
modules: [];//模板
var app = getApp();
///////////////
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    page: 0,  //分页
    addCar: false,//打开购物车
    closeCar: true,//关闭购物车
    price: 1,//购物车数量
    minusStatus: 'disabled',//数量为1禁用
    sum: '',//购物车id
    _num: "", //类型型号
    state: 0,
    cate: 0,
    arr: [],
    attrLen: '', //长度
    values: [], //型号
    figure: '',
    i: 0
  },
  //分类模块切换
  tapKeyWorld1: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var modules = that.data.modules;
    var cate = e.currentTarget.dataset.cate;
    console.log(cate);
    that.setData({
      cate_id: cate
    })
    setTimeout(function () {                  // 获取模块列表索引
      var active1 = e.currentTarget.dataset.active;         // 获取当前商品的选中状态
      var active1 = true;
      var _modules = that.data.modules;
      var sonCategory = modules.sonCategory;
      console.log("22222222222", sonCategory);
      for (var j = 0; j < sonCategory.length; j++) {
        sonCategory[j].active = false;
        if (cate == sonCategory[j].cate_id) {
          sonCategory[j].active = true;
        }
      }
     // sonCategory = sonCategory;
      that.setData({
        modules: modules
      })
      wx.request({
        url: "https://shop.playonwechat.com/api/goods-list?sign=" + app.data.sign,
        data: {
          cate_id: that.data.cate_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("allll",res)
          that.setData({
            sonCategory: res.data.data.goodsList
          })
          wx.hideLoading()
        }
      })
    }, 300)

  },

  //购物车选择商品
  addCar: function (e) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    var that = this;
    // var inform = that.data.inform;    
    var gid = e.currentTarget.dataset.gid;

    // inform[gid]
    wx.setStorageSync("carid", gid);
    wx.setStorageSync("length", gid);
    console.log("carid", gid);
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
        //inform.attribute
        that.setData({
          addCar: true,
          inform: inform,
          figure: inform.picture[0],
          low_price: inform.low_price,
          high_price: inform.high_price
        })
        wx.hideLoading()
        console.log("inform详情", inform);
      }
    })
  },
  closeCar: function (obj) {
    var id = obj.target.id;
    console.log(id);
    var that = this;
    that.setData({
      addCar: false,
      arr: [],
      values: []
    })
  },
  //  添加购物车
  addCars: function (e) {
    var that = this;
    var gid = that.data._gid;
    var attribute = "";
    var types = "";
    var arr = that.data.arr;
    var values = that.data.values;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        attribute += arr[i] + ',';
        types += values[i];
      }
    }
    // 截取最后一位字符
    attribute = attribute.substr(0, attribute.length - 1);
    console.log("aaaaaa", attribute);
    console.log("attribute", typeof attribute[0]);
    console.log("gid", gid);
    var num = that.data.price;
    console.log('gid', gid + 'num', num + 'attribute', attribute);
    wx.request({
      url: "https://shop.playonwechat.com/api/add-carts?sign=" + app.data.sign,
      method: "POST",
      data: {
        gid: that.data._gid,
        num: that.data.price,
        attribute: attribute
      },
      success: function (res) {
        console.log("post", res);
        var status = res.data.status;
        if (status == 1) {
          wx.showToast({
            title: '加入购物车成功',
            image: '../images/success.png'
          });
        } else {
          wx.showToast({
            title: '加入购物车失败',
            image: '../images/false.png'
          });
        }
        that.setData({
          arr: [],
          values: [],
          price: 1
        })

      }
    })
    that.setData({
      addCar: false
    })
  },
  buy: function (e) {
    var that = this;
    var attribute = "";
    var types = "";
    var arr = that.data.arr;
    var values = that.data.values;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        attribute += arr[i] + ',';
        types += values[i] + ' ';
      }
    }
    attribute = attribute.substr(0, attribute.length - 1);
    console.log("aaaaaa", attribute);
    console.log("types", types);
    var carid = wx.getStorageSync("carid");
    var attrLen = that.data.inform.attribute.length;//获取attribute长度
    var arrlen = that.data.arr.length; //数组长度
    console.log('获取attribute长度', attrLen);
    console.log('cccccc', that.data.price + 'aaaa' + that.data.low_price + 'types' + attribute); //bug 数组长度

    if (attrLen > 0) {
      if (arrlen == attrLen) {
        wx.navigateTo({
          url: '../dingdanInform/dingdanInform?gid=' + carid + '&price=' + that.data.price + '&attr=' + attribute + '&types=' + types + '&low_price=' + that.data.low_price
        })
        console.log(attribute);
      } else {
        wx.showToast({
          title: '请选择属性',
          image: '../images/false.png'
        });
      }
    } else {
      wx.navigateTo({
        url: '../dingdanInform/dingdanInform?gid=' + carid + '&' + 'price=' + that.data.price + '&types=' + types + '&low_price=' + that.data.low_price
      })
    }
    that.setData({
      arr: [],
      values: [],
      addCar: false,
      price: 1
    })
  },
  leibieall: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    console.log("e", e)
    var anids = e.currentTarget.dataset.anid;
    this.setData({
      anids: anids,
      index: index
    });
    console.log("this.index", this.data.anids);
  },
  //选择型号
  xuanze: function (e) {
    // console.log(e.currentTarget.dataset.index);
    var that = this;
    var arr = that.data.arr;
    var values = that.data.values;;
    var attribute = [];
    setTimeout(function () {
      var anids = that.data.anids;//
      var index = that.data.index;
      //console.log("index",index);
      var active2 = e.currentTarget.dataset.active; //状态
      var avid = e.target.dataset.avid;//值
      var value = e.target.dataset.value;//value
      //console.log("值", value);
      var _attribute = that.data.inform.attribute;
      var _inform = that.data.inform;
      // //////////////
      var attribute_value = _attribute[index].attribute_value;
      console.log("attribute_value", attribute_value);
      console.log(attribute_value.length);
      for (var j = 0; j < attribute_value.length; j++) {
        attribute_value[j].active = false;
        if (avid == attribute_value[j].avid) {
          attribute_value[j].active = true;
          console.log(attribute_value[j].active);
          var avid1 = attribute_value[j].avid;
          var figure = attribute_value[j].figure;
          if (figure != '') {
            figure = attribute_value[j].figure;
          } else {
            figure = that.data.figure;
          }


          console.log('figure:', attribute_value[j].figure);
          //setTimeout(function () {
          if (index == 0) {
            arr[0] = anids + ':' + avid;
            values[0] = value;
          } else if (index == 1) {
            arr[1] = anids + ':' + avid;
            values[1] = value;
          } else if (index == 2) {
            arr[2] = anids + ':' + avid;
            values[2] = value;
          }
          // }, 100)
        }
      }

      console.log('qqqqqqqqqqqq', arr);
      /////////////////
      console.log("参数", anids, avid, value);
      //////////////////////////////////////////////
      var attribute = "";
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          attribute += arr[i] + ',';
        }
      }

      attribute = attribute.substr(0, attribute.length - 1);
      console.log("111111111111111", attribute);
      var carid = wx.getStorageSync("carid");
      var attrLen = that.data.inform.attribute.length;//获取attribute长度
      var arrlen = that.data.arr.length; //数组长度
      console.log('获取attribute长度', attrLen);
      console.log('数组长度', arrlen); //bug 数组长度
      console.log('low_price:', that.data.inform.low_price);
      var priceGroup = that.data.inform.priceGroup;
      var s = 'attr' + attribute;
      console.log('sssss:', s);
      for (var i = 0; i < priceGroup.length; i++) {
        if (priceGroup[i].key == s) {
          console.log("iiiiii", i);
          var i = i;
          that.setData({
            i: i
          });
          var nowPrice = that.data.inform.priceGroup[that.data.i].price;
          console.log('nowPrice:', nowPrice);
          that.setData({
            inform: _inform,
            figure: figure,
            low_price: nowPrice,
            high_price: nowPrice
          })
        }
      }
      console.log(that.data.low_price + '低;高' + that.data.high_price)
      ///////////////////////////////////////////////


      that.setData({
        inform: _inform,
        figure: figure
      })
      ///////////////
      console.log("attribute111:", attribute);
      that.setData({
        _num: e.target.dataset.avid,
        attribute: attribute
      })
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var price = this.data.price;
    if (price > 1) {
      price--;
    }
    var minusStatus = price <= 1 ? 'disabled' : 'normal';
    this.setData({
      price: price,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var price = this.data.price;
    price++;
    var minusStatus = price < 1 ? 'disabled' : 'normal';
    this.setData({
      price: price,
      minusStatus: minusStatus
    });
  },

  /* 输入框事件 */
  bindManual: function (e) {
    var price = e.detail.value;
    this.setData({
      price: price
    });
  },
  // 加载
  onLoad: function (options) {
    var that = this;
    var cate_id = options.cate_id;
    var index = options.index;
    console.log("传：",cate_id+'/////////'+index);
    that.setData({
      cate_id: options.cate_id,
      index: options.index
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    //获取所有分类
      wx.request({
        url: 'https://shop.playonwechat.com/api/get-category?sign=' + app.data.sign,
        method: "GET",
        success: function (res) {
          console.log("获取所有分类", res);
          var alldata = res.data;
          var fenlei = res.data.categorys;
          console.log("fenlei:", fenlei);
          that.setData({
            modules: fenlei,
          })
          var cate_id = that.data.cate_id;
          var index = that.data.index;
          var contentTip = that.data.modules[index];
          console.log('contentTip:', contentTip);
          that.setData({
            modules: contentTip
          })
          console.log("modules:", that.data.modules)
          wx.hideLoading();
          // // 默认渲染列表
          // 默认渲染列表
          setTimeout(function () {
              var modules = that.data.modules;
              var cate_id = modules.sonCategory[0].cate_id;
              wx.request({
                url: "https://shop.playonwechat.com/api/goods-list?sign=" + app.data.sign,
                data: {
                  cate_id: cate_id
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  that.setData({
                    sonCategory: res.data.data.goodsList
                  })
                  wx.hideLoading()
                }
              })
           
          }, 300)
       },
    });

},

  //设置分享
  onShareAppMessage: function () {

  }
})