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
    lunbo : [],
    fightGroup:[],
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
    _num:"", //类型型号
    state:0,
    cate: 0,
    arr: [],
    attrLen:'', //长度
    values:[], //型号
    figure:'',
    i :0 
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
        
        modules[allindex].typelist = [];
        modules[allindex].typelist = contentTip;
        console.log('typelist', modules[allindex].typelist);
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
//查看全部
  seeAll:function(){
    wx.navigateTo({
      url: '../more/more?cate_id=0'
    })
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
    console.log("carid",gid);
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
          values:[]
      })
 },
//  添加购物车
addCars:function(e){
  var  that = this;
  var gid = that.data._gid;
  var attribute = "";
  var types = "";
  var arr = that.data.arr;
  var values = that.data.values;
  for(var i=0;i<arr.length;i++){
    if(arr[i]){
      attribute += arr[i] + ',';
      types +=values[i];
    }     
  }
  // 截取最后一位字符
  attribute = attribute.substr(0, attribute.length-1);
  console.log("aaaaaa", attribute);
  
  console.log("attribute", typeof attribute[0]);
  console.log("gid", gid);
  var num = that.data.price;
  console.log('gid', gid + 'num', num + 'attribute',attribute);
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
      if (status == 1){
        wx.showToast({
          title: '加入购物车成功',
          image: '../images/success.png'
        });
        
      }else{
        wx.showToast({
          title: '加入购物车失败',
          image: '../images/false.png'
        });
      }
      that.setData({
        arr: [],
        values:[],
        price:1
      })
     
    }
  })
  that.setData({
    addCar: false
  })
},
// 立即购买
buy:function(e){
  var that = this;
  var attribute = "";
  var types ="";
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
  console.log('数组长度', arrlen); //bug 数组长度
  if (attrLen > 0){
    if (arrlen == attrLen){
       wx.navigateTo({
         url: '../dingdanInform/dingdanInform?gid=' + carid + '&price=' + that.data.price + '&attr=' + attribute + '&types=' + types + '&low_price=' + that.data.low_price + '&type=0'
        })
       console.log(attribute);
      }else{
        wx.showToast({
          title: '请选择属性',
          image: '../images/false.png'
        });
      }
  } else{
      wx.navigateTo({
        url: '../dingdanInform/dingdanInform?gid=' + carid + '&' + 'price=' + that.data.price + '&types=' + types + '&low_price=' + that.data.low_price + '&type=0'
      })
  }
  that.setData({
    arr: [],
    values:[],
    addCar: false,
    price:1
  })
 },
leibieall:function(e){
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
  var attribute =[];
  setTimeout(function(){
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

    console.log('qqqqqqqqqqqq',arr);
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
        console.log('sssss:',s);
        for (var i = 0; i < priceGroup.length; i++) {
          // console.log('|||||||||||', priceGroup[i].key);
          // console.log('\\\\\\\\\\',s);
          if (priceGroup[i].key == s){
            console.log("iiiiii",i);
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
          inform : _inform,
          figure: figure
      })
    ///////////////
    console.log("attribute111:",attribute);
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
        console.log("图团秒", res);
        //倒计时
        var nowTime = (new Date()).getTime();
        var begin_time = res.data.data.nextSeckillTime;
        console.log(nowTime + 'sssssssss' + begin_time);
        var ge_nowTime = common.time(nowTime / 1000, 1);
        var be_gainTime = common.time(begin_time, 1);
        var Countdown = begin_time * 1000 - nowTime; //倒计时
        if (Countdown > 0) {
          function dateformat(micro_second) {
            // 秒数
            var second = Math.floor(micro_second / 1000);
            // 小时位
            var day = Math.floor(second / 86400);

            if (day < 10) {
              day = '0' + day;
            }

            var hr = Math.floor((second - day * 86400) / 3600);
            // 分钟位
            if (hr < 10) {
              hr = '0' + hr;
            }

            var min = Math.floor((second - hr * 3600 - day * 86400) / 60);
            if (min < 10) {
              min = '0' + min;
            }
            // 秒位
            var sec = (second - hr * 3600 - min * 60 - day * 86400); // equal to => var sec = second % 60;
            // 毫秒位，保留2位
            if (sec < 10) {
              sec = '0' + sec;
            }
            var micro_sec = Math.floor((micro_second % 1000) / 10);

            return day + ":" + hr + ":" + min + ":" + sec;
          }

          setInterval(function () {
            Countdown -= 1000;
            var time = dateformat(Countdown);
            var splitArr = time.split(":");
           // console.log(splitArr);
            var _Countdown = [{
              day: splitArr[0],
              hr: splitArr[1],
              min: splitArr[2],
              sec: splitArr[3],
            }];
          // console.log(_Countdown);
            that.setData({
              countDown_tatic: true,
              Countdown: _Countdown
            })
          }, 1000)

        } else {
          countDown_tatic: false
        }

        begin_time = common.time(begin_time, 1);
        console.log(begin_time);
        console.log(that.data.Countdown);

        ////////////////////////////////////////////////////////////////////////////

        var lunbo = [];

    // 获取用户名称及发表时间
      that.setData({
        lunbo: res.data.data.carouselGoods,
        fightGroups: res.data.data.fightGroups,
        seckills: res.data.data.seckills,
        currentSeckillTime: res.data.data.currentSeckillTime,
        nextSeckillTime: that.data.Countdown
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
                var typelist = [];
                modules[i].typelist = [];
                modules[i].typelist = contentTip;
                //console.log('typelist', contentTip);
                that.setData({
                  modules: modules
                 // typelist: contentTip
                })
                wx.hideLoading()
              }
            })
          }
          // console.log('typelist', typelist);
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