Page({
  data:{
    types:[{
      id:0,
      icon:'/images/book/rc.jpg',
      typeName:'日常'
    },{
      id:1,
      icon:'/images/book/sy.jpg',
      typeName:'生意'
    },{
      id:2,
      icon:'/images/book/jt.jpg',
      typeName:'家庭'
    },{
      id:3,
      icon:'/images/book/lx.jpg',
      typeName:'旅行'
    },{
      id:4,
      icon:'/images/book/zx.jpg',
      typeName:'装修'
    },{
      id:5,
      icon:'/images/book/jh.jpg',
      typeName:'结婚'
    },{
      id:6,
      icon:'/images/book/xy.jpg',
      typeName:'校园'
    },{
      id:7,
      icon:'/images/book/bf.jpg',
      typeName:'班费'
    },{
      id:8,
      icon:'/images/book/xy.jpg',
      typeName:'学费'
    }]
  },
  formSubmit:function(e){
    console.log(e)
    const name = e.detail.value.name
    const id = e.detail.value.id
    const typeName = this.data.types[id].typeName
    const icon = this.data.types[id].icon
    wx.cloud.callFunction({
      name:'saveBook',
      data:{
        typeName:typeName,
        typeId:id,
        name:name,
        icon:icon
      }
    }).then(res =>{
      console.log(res)
      wx.showToast({
        title: '创建成功',
        icon:'success',
        duration:5000,
        success:function(){
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }).catch(error =>{
      console.error(error)
    })
  }
})