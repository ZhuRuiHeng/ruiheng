//index.js
var common = require('../../common.js');
//获取应用实例
main_content: [];//最新最热
main_content2: [];//列表
modules: [];//模板
var app = getApp();
Page({
  data: {
    lunbo : [],
    imgUrls: ['../images/1.jpg'
      ,'../images/2.jpg'
      , '../images/3.jpg'
      ,'../images/4.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    page: 0,  //分页
    addCar: false,//打开购物车
    closeCar: true,//关闭购物车
    price: 1,//购物车数量
    minusStatus: 'disabled',//数量为1禁用
    sum:'',//购物车id
    _num:1, //类型型号
    state:0,
    cate: 0
    
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
  //轮播图点击跳转
  swipclick: function (event) {
    //console.log(event);
    var gid = event.currentTarget.id
    wx.navigateTo({ 
      url: '../inform/inform?gid=' + gid 
    })
},
  //搜索跳转
search: function() {
  wx.navigateTo({
    url: '../search/search'
  })
},
//1最新最热
tapKeyWorld: function (e) {
  wx.showLoading({
    title: '加载中',
  })
  var   that = this;
  var   word = e.currentTarget.dataset.ontap;
  var   cate = e.currentTarget.dataset.cate;
  var  state = e.currentTarget.dataset.state;
 // console.log(e.target.dataset.state) 
  console.log("索引", cate);
  console.log("关键字", word);
  this.setData({
    searchword : word,
        cateid : cate,
        state: state 
  })
  wx.request({
    url: "https://shop.playonwechat.com/api/goods-list?sign=" + app.data.sign,
    data: {
        order : that.data.searchword,
      cate_id : that.data.cateid
    },
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function (res) {
      // 此处清空全局的数据
      console.log("筛选2",res);
      var main_content = [];
      // 获取用户名称及发表时间
      var contentTip = res.data.data.goodsList;
      console.log('main_content', contentTip);
      that.setData({
        main_content: contentTip
      })
      wx.hideLoading()
    }
  })
},
// 获取索引默认加载引用
suoyin: function (e) {
  console.log("e", e)
  var allindex = e.currentTarget.dataset.allindex;
  this.setData({
    allindex: allindex,
  });
  console.log("this.index", this.data.allindex);
},
//分类模块切换
tapKeyWorld1: function (e) {
  wx.showLoading({
    title: '加载中',
  })
  var that = this;
  var modules = that.data.modules;
  var cate = e.currentTarget.dataset.cate;
  that.setData({
    cate_id: cate
  })
  // console.log("cate",cate);
  // console.log("cate_id", cate);
  setTimeout(function(){
    var allindex = that.data.allindex;                   // 获取模块列表索引
    var active1 = e.currentTarget.dataset.active;         // 获取当前商品的选中状态
    var active1 = true;
    var sonCategory = modules[allindex].sonCategory;
    var _modules = that.data.modules;
      for (var j = 0; j < sonCategory.length; j++) {
        sonCategory[j].active = false;
        if (cate == sonCategory[j].cate_id) {
          sonCategory[j].active = true;
        }
      }
      _modules[allindex].sonCategory = sonCategory;
      that.setData({
        modules: modules
      })
      //console.log("参数", allindex, that.data.cate);
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
        // 此处清空全局的数据
        //console.log("筛选2", res);
        var typelist = [];
        // 获取用户名称及发表时间
        var contentTip = res.data.data.goodsList;
        //console.log('typelist', contentTip);
        modules[allindex].typelist = [];
        modules[allindex].typelist = contentTip;
        that.setData({
          modules: modules
        })
        wx.hideLoading()
      }
    })
  },300)
      
},
 //事件处理函数
bindViewTap: function() {
    wx.navigateTo({
        url: '../logs/logs'
    })
},
//购物车选择商品
addCar: function (e) {
    wx.showToast({
        title: '加载中',
        icon: 'loading'
    });
    var that = this;
    var gid = e.currentTarget.dataset.gid
    console.log("gid",gid);
    that.setData({
      _gid : gid
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
        that.setData({
          addCar: true,
          inform: inform
        })
        wx.hideLoading()
      }
    })
},
closeCar: function (obj) {
      var id = obj.target.id;
      console.log(id);
      var that = this;
      that.setData({
          addCar: false
      })
 },
//  添加购物车
addCars:function(e){
  var  that = this;
  var gid = that.data._gid;
  var shuliang = that.data.price;
  var attribute ="1:1,2:1,3:1";
  console.log(gid + shuliang + attribute);
  wx.request({
    url: "https://shop.playonwechat.com/api/add-carts?sign=" + app.data.sign,
    data: {
      gid: that.data._gid,
      num: that.data.price,
      attribute: that.data._attribute
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    success: function (res) {
      console.log("post", res.data.status);
      var status = res.data.status;
      if (status == 1){
        wx.showToast({
          title: '加入购物车成功',
        });
      }else{
        wx.showToast({
          title: '加入购物车失败',
        });
      }
     
    }
  })

 
},
buy:function(){
  wx.navigateTo({
    url: '../dingdanInform/dingdanInform'
  })
},
leibieall:function(e){
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
  setTimeout(function(){
    var anids = that.data.anids;
    var num = e.target.dataset.num
    console.log("参数", anids, num);
    that.setData({
      _num: e.target.dataset.num
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
    // 将数值与状态写回 
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
    // 将数值与状态写回 
    this.setData({
        price: price,
        minusStatus: minusStatus
    });
},

/* 输入框事件 */
bindManual: function (e) {
    var price = e.detail.value;
    // 将数值与状态写回 
    this.setData({
        price: price
    });
},
// 加载
onLoad: function () {
 
},
onShow: function () { 
  wx.showLoading({
    title: '加载中',
  });
  // 轮播
  var that = this;
  common.getSign(function (){
    // get
    var sign =wx.getStorageSync("sign");
    wx.request({
      url: 'https://shop.playonwechat.com/api/carousel-goods?sign=' + sign,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var imgUrls1 = res.data.data.carouselGoods;
        var lunbo = [];
        // 获取用户名称及发表时间
        that.setData({
          lunbo: imgUrls1
        })
      }
    });
    //最热列表
    wx.request({
      url: "https://shop.playonwechat.com/api/goods-list?sign=" + sign,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var main_content = [];
        // 获取用户名称及发表时间
        var contentTip = res.data.data.goodsList;
        that.setData({
          main_content: contentTip
        })
      }
    });
    //获取所有分类
    wx.request({
      url: 'https://shop.playonwechat.com/api/get-category?sign=' + sign,
      method: "GET",
      success: function (res) {
        console.log("获取所有分类", res);
        var alldata = res.data;
        var fenlei = res.data.categorys;
        that.setData({
          modules: fenlei,
        })
        // 默认渲染列表
        setTimeout(function () {
          var modules = that.data.modules;
          var sindex = [];
          for (let i = 0; i < modules.length; i++) {
            var a = i;
            //sindex.push(i);
            //console.log(i);
            var _modules = that.data.modules;
            var cate_id = modules[i].sonCategory[0].cate_id;
            //console.log("cate_id", cate_id);
            wx.request({
              url: "https://shop.playonwechat.com/api/goods-list?sign=" + sign,
              data: {
                cate_id: cate_id
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                // 此处清空全局的数据
                //console.log("筛选2", res);
                var main_content2 = [];
                // 获取用户名称及发表时间
                var contentTip = res.data.data.goodsList;
                //console.log('typelist', contentTip);
                modules[i].typelist = [];
                modules[i].typelist = contentTip;
                that.setData({
                  modules: modules
                })
                wx.hideLoading()
              }
            })
          }
        }, 300)

      },
    });



  });
},


  // 搜索框
  inputSearch: function (e) {  //输入搜索文字
    this.setData({
      showsearch: e.detail.cursor > 0,
      searchtext: e.detail.value
    })
  },
  submitSearch: function () {  //提交搜索
    console.log(this.data.searchtext);
  },
  //设置分享
  onShareAppMessage: function () {

  }
})