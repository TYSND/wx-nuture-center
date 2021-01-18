// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    banner: [
       "../../static/images/yyy1.jpeg",
       "../../static/images/yyy2.jpeg",
       "../../static/images/yyy3.jpg"
     ],
     intro: [
       "显示详情",
       "点击隐藏"
     ],
     intro_id: 0,
     serve: [
       "服务列表",
       "点击收起"
     ],
     serve_id: 0,
     foodData: [
      {path: "../../static/images/food1.jpeg",detail:"早餐"},
      {path: "../../static/images/food2.jpg",detail:"午餐"},
      {path: "../../static/images/food3.jpg",detail:"晚餐"},
      {path: "../../static/images/food4.jpeg",detail:"豪华套餐"}
     ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  enter() {
    wx.navigateTo({
      url: '../bedList/bedList'
    })
  },
  goAboutUs: function() {
    wx.navigateTo({
      url: '../../pages/aboutUs/aboutUs',
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
