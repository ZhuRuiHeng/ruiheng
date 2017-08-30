//index.js
var common = require('../../common.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: ['http://yanxuan.nosdn.127.net/e5891a68df93c5ee57ddb5b256068dac.jpg'
    ,  'http://yanxuan.nosdn.127.net/90f6c228c71cb9aba926de824e71e78d.jpg'
    , 'http://yanxuan.nosdn.127.net/e5891a68df93c5ee57ddb5b256068dac.jpg'
     ,'https://img.yzcdn.cn/upload_files/2017/08/15/Flm3ribz-z6d2bzBZyWSt0jFUC07.gif?imageView2/2/w/730/h/0/q/75/format/gif'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    selected: true,
    selected1: false,
    hotlist: [], //最热列表
    newlist: [], //最新列表
    page: 0,  //分页
    addCar: false,//打开购物车
    closeCar: true,//关闭购物车
    price: 1,//购物车数量
    minusStatus: 'disabled',//数量为1禁用
    sum:'',//购物车id
    _num:1 //类型
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
  //搜索跳转
search: function() {
  wx.navigateTo({
    url: '../search/search'
  })
},
//最新最热
selected: function (e) {
  this.setData({
    selected1: false,
    selected: true
  })
},
selected1: function (e) {
  this.setData({
    selected: false,
    selected1: true
  })
},
 //事件处理函数
bindViewTap: function() {
    wx.navigateTo({
        url: '../logs/logs'
    })
},
//购物车
addCar: function (obj) {
    wx.showToast({
        title: '加载中',
        icon: 'loading'
    });
    var sum = obj.target.id;
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
  onLoad: function () { //加载数据渲染页面
    this.fetchHotData(); //最热
    this.fetchNewData(); //最新
  },
  // 最热
  fetchHotData: function () {  //获取最热列表
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    const perpage = 10;
    this.setData({
      page: this.data.page + 1
    })
    const page = this.data.page;
    const newlist = [];
    for (var i = (page - 1) * perpage; i < page * perpage; i++) {
      newlist.push({
        "id": i + 1,
        "name": "上海拜特信息技术有限公司上海拜特信息上海拜特信息技术有限公司" + (i + 1),
        "price": "122",
        "img": "../images/car.png",
        "imgurl": "../images/out3.jpg"
      })
    }
    setTimeout(() => {
      _this.setData({
        hotlist: _this.data.hotlist.concat(newlist)
      })
    }, 1500)
  },
  // 最新
  fetchNewData: function () {  //获取最新列表
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    const perpage = 10;
    this.setData({
      page: this.data.page + 1
    })
    const page = this.data.page;
    const newlist = [];
    for (var i = (page - 1) * perpage; i < page * perpage; i++) {
      newlist.push({
        "id": i + 1,
        "name": "深圳龙岗深圳宝安信息技术有限公司信息技术有限公司" + (i + 1),
        "price": "222.00",
        "img": "../images/car.png",
        "imgurl": "../images/out2.jpg"
      })
    }
    setTimeout(() => {
      _this.setData({
        newlist: _this.data.newlist.concat(newlist)
      })
    }, 1500)
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
    this.fetchHotData();
  },
  //设置分享
  onShareAppMessage: function () {

  }
})