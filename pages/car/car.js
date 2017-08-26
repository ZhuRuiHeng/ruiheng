// pages/car/car.js
var common = require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      newlist: [], //最新列表
      page: 0  //分页
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
          console.log('newlist');
          newlist.push({
              "id": i + 1,
              "name": "深圳龙岗深圳宝安信息技术有限公司信息技术有限公司" + (i + 1),
              "price": "222.00",
              "num": i + 1,
              "imgurl": "../images/out2.jpg"
          })
      }
      setTimeout(() => {
          _this.setData({
              newlist: _this.data.newlist.concat(newlist)
          })
      }, 1500)
  },
 //radio
  selectAreaOk: function (event) {
      var selectAreaId = event.target.dataset.areaid;
      var that = this;
      areaId = selectAreaId;
        if (this.id == selectAreaId) {
            this.isSelect = true
        } else {
            this.isSelect = false
        }
      this.setData({
          hideArea: true
      })
      getSkus(that, selectAreaId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      this.fetchNewData(); //最新
  },
  // 返回首页
  backHome: function () {
      common.backHome();
  },
  
})