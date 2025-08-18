Page({
  data:{
    books:[],
    pageIndex:0,
    pageSize:2,
    isloading:false
  },
  onShow:function(){
    this.setData({
      books:[],
      pageIndex:0
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    this.loadBook()
  },
  loadBook:function(){
    this.setData({
      isloading:true
    })
    const pageIndex = this.data.pageIndex
    const books = this.data.books
    wx.cloud.callFunction({
      name:'loadBook',
      data:{
        pageIndex:pageIndex,
        pageSize:2
      }
    }).then(res =>{
      console.log(res)
      const infor = res.result.data//获取账本信息
      let newPageIndex = pageIndex + infor.length
      if(infor.length == 0)
      {
        this.setData({
          isloading : true
        })
        return;
      }
      this.setData({
        pageIndex:newPageIndex,
        books:books.concat(infor)
      })
    }).catch(error =>{
      console.log(error)
    })
    this.setData({
      isloading:false
    })
    wx.hideLoading()
  },
  onPullDownRefresh:function(){
    if(this.data.isloading == false){
      this.loadBook()
      wx.stopPullDownRefresh()
      console.log('下拉刷新成功')
    }
  },
  createBook:function(){
    wx.navigateTo({
      url: '../createBook/createBook',
    })
  }
})