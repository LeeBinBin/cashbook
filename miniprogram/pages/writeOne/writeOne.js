Page({
  data: {
    isShowPicker:false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    accountId: null,
    tradeDate: null,
    totalBalance:0, //总金额
    isChooseTreadDate: false
  },
  isShowPicker:function(){
    this.setData({
      isShowPicker:true
    })
  },
  onLoad: function (options) {
    // 接收路由参数accountId
    if (options.accountId&&options.balance) {
      this.setData({
        accountId: options.accountId,
        totalBalance:options.balance
      })
    }
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  // 表单提交处理
  formSubmit: function (e) {
    // 交易类型
    const type = e.detail.value.type
    // 交易金额
    const balance = e.detail.value.balance
    // 备注
    const remark = e.detail.value.remark
    
    // 计算操作后的总金额
    let totalBalance = parseFloat(this.data.totalBalance)
    if(type==0){
      totalBalance+=balance
    }else{
      totalBalance-=balance
    }

    // 调用云函数
    wx.cloud.callFunction({
      name:'saveAccountDetail',
      data:{
        accountId:this.data.accountId,
        tradeDate:this.data.tradeDate,
        balance:balance,
        totalBalance:totalBalance,
        type:type
      }
    }).then(res =>{
      console.log(res)
    }).catch(error =>{
      console.log(error)
    })
  },

  // 单选按钮变化处理
  radioChange: function (e) {
    console.log('选中的交易类型：', e.detail.value);
  }
});