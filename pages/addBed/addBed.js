// pages/addBed/addBed.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomID: ''
  },

  // 事件处理函数
  submit: function () {
    let that = this
    console.log(that.data.bedID)
    let url = 'http://121.199.18.14:8081/bed/?roomNumber=' + that.data.roomID
    util.request(url, {}, 'POST').then(res => {
      console.log(res)
      wx.showToast({
        title: '增加成功',
        image: '../../static/images/success.png'
      })
      wx.navigateTo({
        url: '../../pages/bedList/bedList',
      })
    })
  },
  cancel: function () {
    wx.navigateTo({
      url: '../../pages/bedList/bedList',
    })
  },
  changeID: function (e) {
    // 获取输入框当前value值
    let value = e.detail.value

    // 及时更新数据
    this.setData({
      roomID: value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})