var app = getApp()
//初始化云开发
wx.cloud.init({
  env:'cloud1-4g5k684112030b04'
});
//初始化数据库
const db = wx.cloud.database();

Page({
  data: {
   openid:null,
   account:[],
   count:0,
   total:0
  },

  loadAccount:function(openid){
    db.collection('account').where({
      _openid:openid
    }).orderBy('createTime','desc').get().then(res =>{
      console.log(res)
      var accounts = res.data;
      var total = 0;
      for(let i=0;i<accounts.length;i++){
        total+=parseFloat(accounts[i].balance)
      }
      this.setData({
        account:accounts,
        total:total,
        count:accounts.length
      })

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getOpenid()
  },
  getOpenid:function(){
    wx.cloud.callFunction({
      name:'login'
    }).then(res =>{
      console.log("云函数返回结果：", res) // 确认是否有 openid
      const openid = res.result.openid
      if (!openid) {
        console.error("未获取到openid")
        return
      }
      this.setData({
        openid:openid
      })
      this.loadAccount(openid)
    }).catch(error =>{
      console.log("云函数调用失败：", error)
    })
  },
  add:function(){
    wx.navigateTo({
      url: '../createAccount/createAccount',
    })
  },
  seeDetail:function(e){
    //标签传参
    const id = e.target.dataset.id
    const balance = e.target.dataset.balance
    wx.navigateTo({
      url: `../accountDetail/accountDetail?id=${id}&balance=${balance}`
    })
  }
})