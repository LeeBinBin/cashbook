Page({
  data:{
    books:[],
    pageIndex:0,
    pageSize:2
  },
  onShow:function(){
    this.setData({
      books:[],
      pageIndex:0
    })
    this.loadBook()
  },
  loadBook:function(){
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
      this.setData({
        pageIndex:newPageIndex,
        books:books.concat(infor)
      })
    }).catch(error =>{
      console.log(error)
    })
  },
  onPullDownRefresh:function(){
    console.log('下拉刷新成功')
    this.loadBook()
  },
  createBook:function(){
    wx.navigateTo({
      url: '../createBook/createBook',
    })
  }
})