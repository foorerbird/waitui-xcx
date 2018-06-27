//detail.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    news_title: '',
    figure_path: '',
    author_name: '',
    create_time: '',
    news_lead: '',
    news_content: ''
  },
  onLoad: function (option) {
    var that = this;
    that.getArticleDetail(option.news_id);
  },
  getArticleDetail: function(news_id) {
    var that = this;
    wx.request({
      url: 'http://140.143.5.238/mobile/Index_controller/get_articleDetailAjax?news_id='+news_id, //请求外推网资讯详情接口
      success: function(res) {
        that.setData({
          news_title: res.data.article.news_title
        });
        that.setData({
          figure_path: res.data.article.figure_path
        });
        that.setData({
          author_name: res.data.article.author_name
        });
        that.setData({
          create_time: res.data.article.create_time
        });
        that.setData({
          news_lead: res.data.article.news_lead
        });
        var news_content = res.data.article.news_content;
        news_content = news_content.replace(/\\=""/g,'');
        WxParse.wxParse('article', 'html', news_content, that);
      }
    })
  }
})
