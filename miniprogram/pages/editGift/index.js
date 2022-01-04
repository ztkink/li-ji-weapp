const dayjs = require('dayjs');

Page({
    /**
     * 页面的初始数据
     */
    data: {
      luckDay: dayjs().format('YYYY-MM-DD'),
      bookId:'',
      money:'',
      type:'',
      wishes:'',
      showCalendar: false
    },
  
    onDisplay() {
      this.setData({
        showCalendar: true
      });
    },
    onClose() {
      this.setData({
        showCalendar: false
      });
    },
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    onConfirm(event) {
      this.setData({
        showCalendar: false,
        luckDay: this.formatDate(event.detail),
      });
    },
    onGiftTypeChange(event) {
      this.setData({
        type: event.detail.name
      });
    },
    onSelectFriends(){
      console.log('选择亲友')
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