//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ad_list: []
  },
  onLoad: function () {
    var that = this;
    that.getAdvertiseList(10);
  },
  getAdvertiseList: function(limit) {
    var that = this;
    wx.request({
      url: 'http://140.143.5.238/Index_controller/get_advertisementAjaxImageVideo', //请求外推网广告列表接口
      data: {
        limit: limit
      },
      success: function(res) {
        console.log(res.data.ad_list)
        that.setData({
          ad_list: that.data.ad_list.concat(res.data.ad_list)
        });
      }
    })
  }
})
