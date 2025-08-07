Page({
  data: {
    balance:0,
    id:null,
    accountDetails:[]
  },
  onLoad(e) {
    console.log(e)
    this.setData({
      id:e.id,
      balance:e.balance
    })
    this.loadAccountDetail(this.data.id)
  },
  loadAccountDetail:function(accountId){
    wx.cloud.callFunction({
      name:'loadAccountDetail',
      data:{
        accountId:accountId
      }
    }).then(res =>{
      console.log(res)
      const result = res.result.data
      this.setData({
        accountDetails:result
      })
    }).catch(error =>{
      console.log(error)
    })
  },
  writeOne:function(){
    const accountId = this.data.id
    const balance = this.data.balance
    wx.navigateTo({
      url: `../writeOne/writeOne? accountId=${accountId}&balance=${balance}`,
    })
  }

})