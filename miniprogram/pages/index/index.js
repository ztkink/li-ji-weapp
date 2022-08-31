// pages/index/index.js
const bookService = require('../../alicloud/services/book')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    pageNo: 0,
    giftBooks: [],
    actionId: '',
    showBookAction: false,
    bookActions: [{
        name: '编辑',
      },
      {
        name: '删除',
        subname: '该礼簿所有来往记录都将被删除',
      },
    ],
  },
  onSearch() {
    wx.showToast({
      title: '搜索...马上写完，真的',
      icon: 'none',
    })
  },
  // 添加收礼
  onAddGift() {
    wx.navigateTo({
      url: '/pages/giftReceive/edit/index',
    });
  },
  // 添加礼簿
  onAddBook() {
    let that = this
    wx.navigateTo({
      url: '/pages/book/edit/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        dialogResult: function (data) {
          that.bookEditDialog(data)
        },
      }
    });
  },
  // 点击礼簿
  onBookClick(e) {
    wx.navigateTo({
      url: `/pages/book/details/index?bookId=${e.currentTarget.dataset.bookid}`,
    });
  },
  // 长按礼簿
  onBookLongPress(e) {
    this.setData({
      showBookAction: true,
      actionId: e.currentTarget.dataset.bookid
    });
  },
  // 长按礼簿-关闭
  onCloseBookAction() {
    this.setData({
      showBookAction: false
    });
  },
  // 长按礼簿-动作
  onSelectBookAction(event) {
    const that = this
    switch (event.detail.name) {
      case '删除':
        wx.showModal({
          title: '删除礼簿？',
          content: '该礼簿所有来往记录都将被删除，确定删除？',
          async success(result) {
            if (result.confirm) {
              const res = await bookService.deleteBook({
                _id: that.data.actionId
              })
              if (res.success) {
                wx.showToast({
                  title: '删除成功',
                })
                that.setData({
                  giftBooks: that.data.giftBooks.filter(i => {
                    return i._id != that.data.actionId
                  })
                })
              }
            }
          }
        })
        break;
      case '编辑':
        wx.navigateTo({
          url: `/pages/book/edit/index?bookId=${this.data.actionId}`,
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            dialogResult: function (data) {
              that.bookEditDialog(data)
            },
          }
        });
        break;
      default:
        break;
    }
  },
  // 礼簿编辑回调
  bookEditDialog(detail) {
    console.log(detail)
    switch (detail.type) {
      case 'insert':
        this.data.giftBooks.unshift(detail.data)
        this.setData({
          giftBooks: this.data.giftBooks
        })
        break;
      case 'update':
        let updateIndex = this.data.giftBooks.findIndex(i => {
          return i._id == detail.data._id
        })
        this.data.giftBooks[updateIndex].title = detail.data.title
        this.setData({
          giftBooks: this.data.giftBooks
        })
        break;
      case 'delete':
        let delIndex = this.data.giftBooks.findIndex(i => {
          return i._id == detail.data._id
        })
        this.data.giftBooks.splice(delIndex, 1)
        this.setData({
          giftBooks: this.data.giftBooks
        })
        break;
      default:
        break;
    }
  },
  // 计算礼簿收礼金额
  computeTotal(datas) {
    return datas.map(i => {
      i.giftCount = i.giftList.length || 0
      i.giftTotal = 0
      for (let item of i.giftList) {
        i.giftTotal += Number(item.money)
      }
      return i
    })
  },
  // 加载数据
  async loadData(page) {
    const that = this
    const res = await bookService.getBookPage({
      page: page,
      limit: 10
    })
    if (res.success) {
      const resList = that.computeTotal(res.data)
      that.setData({
        giftBooks: this.data.giftBooks.concat(resList),
        pageNo: page
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    await this.loadData(1)
    // 人为延迟一点，避免loading动画闪烁
    setTimeout(function () {
      wx.hideLoading()
    }, 666)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 感觉延迟一下，会舒服点
    setTimeout(async () => {
      this.setData({
        giftBooks: []
      })
      await this.loadData(1)
      wx.stopPullDownRefresh()
    }, 666);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.loadData(this.data.pageNo + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})