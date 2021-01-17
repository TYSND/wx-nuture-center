const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const request = function (url, data = {}, method = "POST", contentType = "application/json") {
  return new Promise(function(resolve, reject) {
    var app = getApp();
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.hideLoading();
            wx.navigateTo({
              url: '/pages/auth/login/login'
            });
          } else {
            resolve(res.data);
          }
        } else {
          if (res.statusCode == 401) {
            wx.hideLoading();
            var requestData = {};
            requestData.url = url;
            requestData.data = data;
            promiseQueue.push(requestData);
            resolve(getToken());
            //以上为刷新执行代码
          } else if (res.statusCode == 400){
            wx.hideLoading();
            console.log(res);
            wx.showToast({
              title: res.data.errors[0].defaultMessage,
              image: '/static/images/icon_error.png'
            })
          } else if (res.statusCode == 403) {
            wx.hideLoading();
            app.globalData.hasLogin = false;
            wx.removeStorageSync('token');
            wx.removeStorageSync('refreshToken');
            wx.removeStorageSync('userInfo');
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/auth/login/login'
            });
            return;
          }
          //reject(res.errMsg);
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

module.exports = {
  formatTime,
  request
}
