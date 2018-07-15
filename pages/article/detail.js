//detail.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    article_title: '',
    figure_path: '',
    author_name: '',
    create_time: '',
    article_lead: '',
    article_content: ''
  },
  onLoad: function (option) {
    var that = this;
    that.getArticleDetail(option.article_id);
  },
  getArticleDetail: function(article_id) {
    var that = this;
    wx.request({
      url: 'http://140.143.5.238/mobile/Index_controller/get_articleDetailAjax?article_id='+article_id, //请求外推网资讯详情接口
      success: function(res) {
        that.setData({
          article_title: res.data.article.article_title
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
          article_lead: res.data.article.article_lead
        });
        var article_content = res.data.article.article_content;
        article_content = article_content.replace(/\\=""/g,'');
        WxParse.wxParse('article', 'html', article_content, that);
      }
    })
  }
})
