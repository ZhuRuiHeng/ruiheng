// pages/car/car.js
var common = require('../../common.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      page: 0,  //分页
      price: 1,//购物车数量
      minusStatus: 'disabled',//数量为1禁用
      carts: [],               // 购物车列表
      hasList: false,          // 列表是否有数据
      totalPrice: "",           // 总价，初始为0
      selectAllStatus: true,
      seting : false,    // 全选状态，默认全选
      set1: true,
      set2: false,
      wenzi:'编辑',
      ids : 1,
      change_carts : ''
  },
  // 最新
  fetchNewData: function () {  //获取最新列表
      let _this = this;
      wx.showToast({
          title: '加载中',
          icon: 'loading'
      })
      wx.request({
        url: 'https://shop.playonwechat.com/api/get-carts?sign=' + app.data.sign,
        method: "GET",
        success: function (res) {
          console.log(res);
          var carts = res.data.data.carts;
          var count = res.data.data.count;
          console.log("count", count);
          // setTimeout(() => {
            _this.setData({
              hasList: true,
              carts: carts,
              len: count
            })
            _this.getTotalPrice();
          // }, 1500)
          wx.hideLoading()
        },
      });
  },

  //选择
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    this.setData({
      carts: carts,
      selectAllStatus: false   //状态改变去掉全选样式
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  //全选
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  //增减数量
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let number = parseInt(carts[index].number);
    let key = carts[index].key;
    number = number + 1;
    console.log(number);
    carts[index].number = number;
    var str = key + '|' + number;
    carts[index].str = str;
    this.setData({
      carts : carts,      
    });4
    console.log(carts);
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let key = carts[index].key;
    let number = carts[index].number;
    if (number <= 1) {
      return false;
    }
    number = number - 1;
    carts[index].number = number;
    var str = key + '|' + number;
    carts[index].str = str;
    this.setData({
      carts: carts,
    });
    console.log(carts);
    this.getTotalPrice();
  },
  //删除商品
  delItem: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          //获取列表中要删除项的下标  
          var index = e.target.dataset.index;
          var carts = that.data.carts;
          var keys  =  carts[index].key;
          console.log(keys);
          //移除列表中下标为index的项  
           wx.request({
             url: "https://shop.playonwechat.com/api/remove-cart-by-key?sign=" + app.data.sign,
             header: {
               'content-type': 'application/json'
             },
             method: "GET",
              data: {
                keys: carts[index].key
              },
              success: function (res) {
                console.log("post", res);
                var status = res.data.status;
                if (status == 1) {
                  wx.showToast({
                    title: '删除商品成功',
                    image: '../images/success.png'
                  });
                } else {
                  wx.showToast({
                    title: '删除商品失败',
                    image: '../images/false.png'
                  });
                }

              }
          })
  
          carts.splice(index, 1);
          //更新列表的状态  
          that.setData({
            carts: carts
          });
        } else {
          initdata(that)
        }
      }
    })
  },  
  // 计算总价
  getTotalPrice() {
    let carts = this.data.carts; 
    let len = this.data.len; 
    let total = 0;
    console.log("len",len);
    for (let i = 0; i < len; i++) {     // 循环列表得到每个数据
      if (carts[i].selected) { 
        total += carts[i].number * carts[i].price;     // 所有价格加起来
      }
    }
    
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  //seting编辑
  seting: function (e) {
    console.log(e.target.id);
    var ids = e.target.id;
    if (ids == 1) {
      this.setData({
        set1: false,
        set2: true,
        wenzi: '完成',
        ids: 2
      })
    } else {
      this.setData({
        set1: true,
        set2: false,
        wenzi: '编辑',
        ids: 1
      })

      var carts = this.data.carts;
      var change_carts = this.data.change_carts;
      //console.log(carts.length);
      for (var i = 0; i < carts.length; i++) {
        console.log(carts[i].str);
        if (carts[i].str != undefined){
          change_carts += carts[i].str + ";"; //拼接字符
        }
      }
      change_carts = change_carts.substr(0, change_carts.length - 1); // 截取最后一位字符
      console.log("change_carts:", change_carts);
      wx.request({
        url: "https://shop.playonwechat.com/api/carts-manage?sign=" + app.data.sign,
        method: "POST",
        data: {
          change_carts: change_carts
        },
        success: function (res) {
          //console.log("post", res);
          var status = res.data.status;
          if (status == 1) {
            wx.showToast({
              title: '编辑商品成功',
              image: '../images/success.png'
            });
          } else {
            wx.showToast({
              title: '编辑商品失败',
              image: '../images/false.png'
            });
          }
        }
      })
      this.setData({
        change_carts:''
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      
  },
  onShow:function(){
    this.fetchNewData(); //最新

  },
  // 返回首页
  backHome: function () {
      common.backHome();
  }
  
})