// pages/car/car.js
var common = require('../../common.js');
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
      totalPrice: 0,           // 总价，初始为0
      selectAllStatus: true,
      seting : false,    // 全选状态，默认全选
      set1: true,
      set2: false,
      wenzi:'编辑',
      ids : 1
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
      const carts = [];
      for (var i = (page - 1) * perpage; i < page * perpage; i++) {
          console.log('carts');
          carts.push({
              "id": i + 1,
              "name": "深圳龙岗深圳宝安信息技术有限公司信息技术有限公司" + (i + 1),
              "price": "222.0" + (i + 1),
              "num": i + 1,
              "imgurl": "https://qncdn.playonwechat.com/shangcheng/out2.jpg",
              "selected": true
          })
      }
      setTimeout(() => {
          _this.setData({
              carts: _this.data.carts.concat(carts)
          })
      }, 1500)
  },
 //seting编辑
  seting:function(e){
    console.log(e.target.id);
    
    var ids = e.target.id;
    if(ids == 1){
      this.setData({
        set1: false,
        set2: true,
        wenzi: '完成',
        ids:2
      })
    }else{
      this.setData({
        set1: true,
        set2: false,
        wenzi: '编辑',
        ids:1
      })
    }
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
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  //删除商品
  delItem: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          //获取列表中要删除项的下标  
          var index = e.target.dataset.index;
          var carts = that.data.carts;
          //移除列表中下标为index的项  
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
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      this.fetchNewData(); //最新
      this.getTotalPrice();
  },
  // 返回首页
  backHome: function () {
      common.backHome();
  }
  
})