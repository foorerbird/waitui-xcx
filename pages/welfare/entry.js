//entry.js
//获取应用实例
const app = getApp()

Page({
  data: {
    welfare_list: []
  },
  onLoad: function () {
    var that = this;
    that.getWelfareList();
  },
  getWelfareList: function(e) {
    var that = this;
    wx.request({
      url: 'http://140.143.5.238/mobile/Index_controller/get_welfareAjax', //请求外推网福利列表接口
      success: function(res) {
        that.setData({
          welfare_list: that.data.welfare_list.concat(res.data.welfare_list)
        });
      }
    })
  }
})
