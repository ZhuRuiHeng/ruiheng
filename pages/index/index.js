//index.js
var common = require('../../common.js');
//获取应用实例
main_content: [];
var app = getApp()
Page({
  data: {
    lunbo : [],
    imgUrls: ['../images/1.jpg'
      ,'../images/2.jpg'
      , '../images/3.jpg'
      ,'../images/4.jpg'
    ],
    newlists:[{
      imgurl: 'https://gd4.alicdn.com/imgextra/i2/1747771701/TB2Imq3XnZKL1JjSZFIXXX_DFXa_!!1747771701.jpg_400x400.jpg',
      name: "红浆果提拉米苏百香果芒果星空蛋糕",
      price:'126',
      img:'https://qncdn.playonwechat.com/shangcheng/car.png'

    }, {
        imgurl: '../images/6.jpg',
        name: "柠檬生姜星空蛋糕",
        price: '126',
        img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }, {
        imgurl: '../images/7.jpg',
        name: "牛轧糖坚果星空蛋糕",
        price: '126',
        img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }
      , {
      imgurl: '../images/8.jpg',
      name: "芒果沙滩星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }
      , {
        imgurl: '../images/9.jpg',
        name: "芝士海盐星空蛋糕 ",
        price: '126',
        img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      }
      , {
        imgurl: '../images/6.jpg',
        name: "步步高升星空蛋糕",
        price: '126',
        img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
      }],
    newlistsa: [{
      imgurl: '../images/7.jpg',
      name: "芒果茫茫星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'

    }, {
      imgurl: '../images/9.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }, {
      imgurl: '../images/8.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }
      , {
      imgurl: '../images/7.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }
      , {
      imgurl: '../images/6.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }
      , {
      imgurl: '../images/5.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }],
    newlistsb: [{
      imgurl: '../images/9.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'

    }, {
      imgurl: '../images/8.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }, {
      imgurl: '../images/9.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }
      , {
      imgurl: '../images/8.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }
      , {
      imgurl: '../images/7.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }
      , {
      imgurl: '../images/6.jpg',
      name: "榴莲香雪星空蛋糕",
      price: '126',
      img: 'https://qncdn.playonwechat.com/shangcheng/car.png'
    }],
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
  //轮播图点击跳转
  swipclick: function (e) {
    wx.navigateTo({
      url: '../inform/inform'
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
//商品列表
tapKeyWorld: function (e) {
  wx.showLoading({
    title: '加载中',
  })
  var that = this;
  var word = e.target.dataset.ontap;
  var cate = e.target.dataset.cate;
  console.log("索引", cate);
  console.log("关键字", word);
  this.setData({
    searchword : word,
        cateid : cate
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
// 加载
  onLoad: function () { //加载数据渲染页面
    this.fetchHotData(); //最热
    this.fetchNewData(); //最新
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
        console.log("最热", res);
        var main_content = [];
        // 获取用户名称及发表时间
        var contentTip = res.data.data.goodsList;
        console.log('main_content',contentTip);
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
          //console.log("轮播", res);
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
          console.log("推荐商品列表", res);
          
          // 获取用户名称及发表时间
          that.setData({
            // lunbo: imgUrls1
          })
        }
    });
  },

  //获取所有分类
  onShow: function () {
    var that = this;
    var sign = "2fb308d298a4f5482b757111c56c1a9c";
    wx.request({
      url: 'https://shop.playonwechat.com/api/get-category?sign=' + sign,
      method: "GET",
      success: function (res) {
        console.log(res);
        var    fenlei = res.data.categorys; 
        var cateName = [];
        that.setData({
          fenlei: cateName
        })
      },
    });

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
        "img": "https://qncdn.playonwechat.com/shangcheng/car.png",
        "imgurl": "https://gd2.alicdn.com/imgextra/i2/1747771701/TB2Imq3XnZKL1JjSZFIXXX_DFXa_!!1747771701.jpg_400x400.jpg_.webp"
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
        "img": "http://p1.meituan.net/320.0.a/deal/7788d06d1051890780b9076e495ed260334638.jpg@7_0_626_380a%7C388h_640w_2e_100Q",
        "imgurl": "../images/1.jpg"
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