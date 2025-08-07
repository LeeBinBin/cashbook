Page({
  data:{
    types:[{
      id:0,
      icon:'/images/account/xj.jpg'
    },{
      id:1,
      icon:'/images/account/zfb.jpg'
    },{
      id:2,
      icon:'/images/account/wx.jpg'
    }]
  },
  formSubmit:function(e){
    const id = e.detail.value.id
    const name = e.detail.value.name
    const balance = e.detail.value.balance
    const remark = e.detail.value.remark
    const type = this.data.types[id]
    wx.cloud.callFunction({
      name:'saveAccount',
      data:{
        balance:balance,
        icon:type.icon,
        name:name,
        remark:remark,
        typeId:type.id
      }
    }).then(res =>{
      console.log(res)
      wx.showToast({
        title: '创建成功',
        icon:'success',
        duration:1000,
        backPage:function(){
          wx.navigateBack({
            delta:1
          })
        }
      })
    }).catch(error =>{
      console.log(error)
    })
  }
})