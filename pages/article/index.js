//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    article_list: [],
    article_page: 1,//10条一页，每次加载10条
    loading: true
  },
  onLoad: function () {
    var that = this;
    that.getArticleList();
  },
  onPullDownRefresh: function(){
    var that = this;
    that.setData({
      article_page: 1
    })
    that.refreshArticleList();
  },
  onReachBottom: function(){
    var that = this;
    if(!that.data.loading){
        return;
    }
    that.getArticleList();
  },
  getArticleList: function(e) {
    var that = this;
    wx.request({
      url: 'http://140.143.5.238/Index_controller/get_articleAjax?page='+that.data.article_page, //请求外推网资讯列表接口
      success: function(res) {
        console.log(res.data.article_list)
        that.setData({
          article_list: that.data.article_list.concat(res.data.article_list)
        });
        that.setData({
          article_page: that.data.article_page+1
        });
        if(res.data.article_list.length < 10){
          that.setData({
            loading: false
          });
        }
      }
    })
  },
  refreshArticleList: function(e) {
    var that = this;
    wx.request({
      url: 'http://140.143.5.238/Index_controller/get_articleAjax?page='+that.data.article_page, //请求外推网资讯列表接口
      success: function(res) {
        that.setData({
          article_list: res.data.article_list
        });
        that.setData({
          article_page: 1
        });
        wx.stopPullDownRefresh()
      }
    })
  }
})
