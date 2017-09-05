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
  var state = e.currentTarget.dataset.state;
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
suoyin: function (e) {
  console.log("e",e)
  var allindex = e.currentTarget.dataset.allindex;
  this.setData({
    allindex: allindex,
  });
  console.log("this.index",this.data.allindex);
},
//分类模块切换
tapKeyWorld1: function (e) {
  wx.showLoading({
    title: '加载中',
  })
  var that = this;
  var modules = that.data.modules;
  var cate = e.currentTarget.dataset.cate;
  

  //var fid = e.currentTarget.dataset.fid;
  // for (var i = 0; i < modules.length;i++){
      
  // }
  
  setTimeout(function(){
    var allindex = that.data.allindex;                   // 获取购物车列表
    var active1 = e.currentTarget.dataset.active;         // 获取当前商品的选中状态
    //allindex[allindex].active = !active;              // 改变状态
    var active1 = true;
    console.log(active1);
    //console.log("索引", cate);
    //console.log("allindex", allindex);
  
    var sonCategory = modules[allindex].sonCategory;
    var _modules = that.data.modules;
    console.log(sonCategory);
      for (var j = 0; j < sonCategory.length; j++) {
        console.log("mmmmm",sonCategory[j].active);
        sonCategory[j].active = false;
        console.log('1111', cate);
        if (cate == sonCategory[j].cate_id) {
          sonCategory[j].active = true;
        }
      }
      _modules[allindex].sonCategory = sonCategory;
      that.setData({
        modules: modules
      })
     


  //   var obj = {};
  //   obj.cate_id = cate;
  //   obj.cate_name = cate;
  //   obj.active = false;

  //  that.setData({
  //     cateid: cate,
  //     cate: cate,
  //     active: active1
  //   })
    wx.request({
      url: "https://shop.playonwechat.com/api/goods-list?sign=" + app.data.sign,
      data: {
        cate_id: that.data.cateid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        // 此处清空全局的数据
        console.log("筛选2", res);
        var main_content2 = [];
        // 获取用户名称及发表时间
        var contentTip = res.data.data.goodsList;
        console.log('main_content2', contentTip);
        that.setData({
          main_content2: contentTip
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
//购物车
addCar: function (event) {
    wx.showToast({
        title: '加载中',
        icon: 'loading'
    });
    var sum = event.target.id;
    console.log('sum'+sum);
    var that = this;
    that.setData({
        addCar: true,
        sum: sum
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
addCars:function(){
  wx.showToast({
    title: '加入购物车成功',
  });
},
buy:function(){
  wx.navigateTo({
    url: '../dingdanInform/dingdanInform'
  })
},
 //选择型号
xuanze: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
        _num: e.target.dataset.num
    })
},
/* 点击减号 */
bindMinus: function () {
    console.log('-');
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
    console.log('+');
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
// 加入购物车
addCars: function(){
  wx.showToast({
    title: '添加购物车成功 ~',
    duration: 2000
  })
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
  //获取所有分类
  var that = this;
  wx.request({
    url: 'https://shop.playonwechat.com/api/get-category?sign=' + app.data.sign,
    method: "GET",
    success: function (res) {
      console.log("获取所有分类",res);
      var  alldata = res.data;
      var   fenlei = res.data.categorys;
      //console.log("alldata",alldata);
      that.setData({
        modules: fenlei,
      })
    },
  });
  //加载数据渲染页面
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    }),
    //最热列表
    wx.request({
      url: "https://shop.playonwechat.com/api/goods-list?sign=" + app.data.sign,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        //console.log("最热", res);
        var main_content = [];
        // 获取用户名称及发表时间
        var contentTip = res.data.data.goodsList;
        //console.log('main_content',contentTip);
        that.setData({
          main_content: contentTip
        })
      }
    })
    // 轮播
    var that = this;
    wx.request({
        url: 'https://shop.playonwechat.com/api/carousel-goods?sign=' + app.data.sign,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("轮播", res);
          var imgUrls1 = res.data.data.carouselGoods;
          var    lunbo = [];
          // 获取用户名称及发表时间
          that.setData({
            lunbo: imgUrls1
          })
        }
    });
    
    //商品列表
    wx.request({
      url: 'https://shop.playonwechat.com/api/goods-list?sign=' + app.data.sign,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          // 获取用户名称及发表时间
          console.log(res);
          that.setData({
            // lunbo: imgUrls1
          })
        }
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