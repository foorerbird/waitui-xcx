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
        var res_ad_list = res.data.ad_list;
        for (var i=0; i<res_ad_list.length; i++) {
          res_ad_list[i].play = false;
        }
        that.setData({
          ad_list: that.data.ad_list.concat(res_ad_list)
        });
      }
    })
  },
  slideNext: function(event){
    var that = this;
    that.getAdvertiseList(1);
  },
  videoPlay: function(event){
    var that = this;
    var index = event.target.dataset.index;
    var order = event.target.dataset.order;
    that.videoContext = wx.createVideoContext('video_'+order);
    if(that.data.ad_list[index].play){
        that.setData({
          ['ad_list['+index+'].play']: false
        });
        that.videoContext.pause();
    }else{
        that.setData({
          ['ad_list['+index+'].play']: true
        });
        that.videoContext.play();
    }
    
  }
})
